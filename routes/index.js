const express = require('express');
const userController = require('../Controller/user.controller')
const router = express.Router();

const {body} = require('express-validator')
const authMiddleware = require('../Middleware/auth.middleware')


/* GET home page. */
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router;
