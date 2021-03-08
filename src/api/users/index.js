const express = require('express')
const controllersUsers = require('../../controllers/users.js')
const router = express.Router()
const guard = require('../../helpers/guard')
const { validateCreateUser } = require('../../validation/users.js')
const accountLimiter = require('../../helpers/accountLimiter')

router.post('/registration', accountLimiter, validateCreateUser, controllersUsers.reg)
router.post('/login', controllersUsers.login)
router.post('/logout', guard, controllersUsers.logout)


module.exports = router