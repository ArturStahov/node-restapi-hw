const { v4: uuid } = require('uuid')
const db = require('../db')


class NotesRepository {
    constructor() {
    }

    getAll() {
        return db.get('notes')
            .value()
    }

    getByID(id) {
        return db.get('notes')
            .find({ id })
            .value()
    }

    create(body) {
        const id = uuid()
        const recordNote = {
            id,
            ...body
        }
        db.get('notes')
            .push(recordNote)
            .write()
        return recordNote
    }

    update(id, body) {
        const recordNote = db.get('notes')
            .find({ id })
            .assign(body).value()
        db.write()
        return recordNote.id ? recordNote : null
    }

    remove(id) {
        const [record] = db.get('notes')
            .remove({ id })
            .write()
        return record
    }
}


module.exports = NotesRepository