const db = require('../bin/db')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const ApiError = require('../Exeption/api-error')

const mailService = require('./mail.service')
const tokenService = require('./token.service')

class UserService {
    async registration(email, password) {
        const condidate = await db.query("SELECT * FROM users WHERE email = $1", [email])

        if (condidate.rowCount != 0) {
            throw ApiError.BadRequest('A user with such an email already exists!')
        }else {
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuid.v4()


            const user = await db.query('INSERT INTO users (email,password,activationlink) VALUES($1,$2,$3) RETURNING *', [email, hashPassword, activationLink])

            await mailService.sendActivationMail(email, `${process.env.API_URL}api/activate/${activationLink}`)
            const tokens = tokenService.generateToken(...user.rows)

            await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)



            return {
                ...tokens, user: user
            }
        }
    }

    async activate(activateLink) {
        const user = await db.query("SELECT * FROM users WHERE activationlink = $1", [activateLink])


        if (!user) {
            throw ApiError.BadRequest('Incorrect link for account activation!')
        }


        return await db.query("UPDATE users SET isactivate = true WHERE activationlink = $1", [activateLink])
    }

    async login(email, password) {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email])

        if (user.rowCount === 0) {
            throw ApiError.BadRequest('A user with such an email has not been found!')
        }


        const isPassEqual = await bcrypt.compare(password, user.rows[0].password)

        if (!isPassEqual) {
            throw ApiError.BadRequest('Wrong password!')
        }

        const tokens = tokenService.generateToken(...user.rows)

        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)
        return {
            ...tokens, user: user
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)

        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await db.query("SELECT * FROM users WHERE id = $1", [userData.id])
        const tokens = tokenService.generateToken(...user.rows)

        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)
        return {
            ...tokens, user: user
        }

    }

    async getAllUsers() {
        return await db.query("SELECT * FROM users")
    }
}

module.exports = new UserService()