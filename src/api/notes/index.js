const express = require('express')
const controllersNotes = require('../../controllers/notes.js')
const router = express.Router()
const { validateCreateNotes, validateUpdateNotes } = require('../../validation/notes.js')
const guard = require('../../helpers/guard')

router
    .get('/', guard, controllersNotes.getAll)
    .get('/:id', guard, controllersNotes.getByID)
    .post('/', guard, validateCreateNotes, controllersNotes.create)
    .put('/:id', guard, validateUpdateNotes, controllersNotes.update)
    .patch('/:id', guard, validateUpdateNotes, controllersNotes.patch)
    .delete('/:id', guard, controllersNotes.remove)

module.exports = router