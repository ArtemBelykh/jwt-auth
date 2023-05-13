const jwt = require('jsonwebtoken')
const db = require('../bin/db')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await db.query('SELECT * FROM tokens WHERE userid = $1', [userId])

        if (tokenData.rowCount != 0) {

            tokenData.rows[0].refreshtoken = refreshToken
            return await db.query('UPDATE tokens set refreshtoken = $1 RETURNING *', [refreshToken])
        }

        return await db.query("INSERT INTO tokens (userid, refreshtoken) VALUES($1,$2) RETURNING *", [userId, refreshToken])
    }

    async removeToken(refreshToken) {
        return await db.query('DELETE FROM tokens WHERE refreshtoken = $1 RETURNING *', [refreshToken])
    }

    async findToken(refreshToken) {
        return await db.query('SELECT * FROM tokens WHERE refreshtoken = $1', [refreshToken])
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY)
        }catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY)
        }catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()