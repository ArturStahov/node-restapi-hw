const express = require('express')
const controllersUsers = require('../../controllers/users.js')
const router = express.Router()
const guard = require('../../helpers/guard')
// const { validateCreateNotes, validateUpdateNotes } = require('../../validation/notes.js')

router
    .post('/registration', controllersUsers.reg)
    .post('/login', controllersUsers.login)
    .post('/logout', guard, controllersUsers.logout)


module.exports = router