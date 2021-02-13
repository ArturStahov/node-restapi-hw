const express = require('express')
const controllersNotes = require('../../controllers/notes.js')
const router = express.Router()
const { validateCreateNotes, validateUpdateNotes } = require('../../validation/notes.js')

router.get('/', controllersNotes.getAll)
    .get('/:id', controllersNotes.getByID)
    .post('/', validateCreateNotes, controllersNotes.create)
    .put('/:id', validateUpdateNotes, controllersNotes.update)
    .patch('/:id', validateUpdateNotes, controllersNotes.patch)
    .delete('/:id', controllersNotes.remove)

module.exports = router