const { NotesRepository } = require('../repository')
const db = require('../db/db-config.js')

class NotesServices {
    constructor() {
        this.repositories = {
            notes: new NotesRepository()
        }
    }

    async getAll() {
        const data = await this.repositories.notes.getAll()
        return data
    }

    async getByID({ id }) {
        const data = await this.repositories.notes.getByID(id)
        return data
    }

    async create(body) {
        const data = await this.repositories.notes.create(body)
        return data
    }

    async update({ id }, body) {
        const data = await this.repositories.notes.update(id, body)
        return data
    }

    async remove({ id }) {
        const data = await this.repositories.notes.remove(id)
        return data
    }
}

module.exports = NotesServices