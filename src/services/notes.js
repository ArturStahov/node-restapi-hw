const { NotesRepository } = require('../repository')

class NotesServices {
    constructor() {
        this.repositories = {
            notes: new NotesRepository()
        }
    }

    getAll() {
        const data = this.repositories.notes.getAll()
        return data
    }

    getByID({ id }) {
        const data = this.repositories.notes.getByID(id)
        return data
    }

    create(body) {
        const data = this.repositories.notes.create(body)
        return data
    }

    update({ id }, body) {
        const data = this.repositories.notes.update(id, body)
        return data
    }

    remove({ id }) {
        const data = this.repositories.notes.remove(id)
        return data
    }
}

module.exports = NotesServices