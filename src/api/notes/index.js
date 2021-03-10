const express = require('express')
const controllersNotes = require('../../controllers/notes.js')
const router = express.Router()
const { validateCreateNotes, validateUpdateNotes } = require('../../validation/notes.js')
const guard = require('../../helpers/guard')

router.get('/', guard, controllersNotes.getAll)
router.get('/:id', guard, controllersNotes.getByID)
router.post('/', guard, validateCreateNotes, controllersNotes.create)
router.put('/:id', guard, validateUpdateNotes, controllersNotes.update)
router.patch('/:id', guard, validateUpdateNotes, controllersNotes.patch)
router.delete('/:id', guard, controllersNotes.remove)

module.exports = router