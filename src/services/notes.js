const { NotesRepository } = require('../repository')


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

    async create(body, userId) {
        const data = await this.repositories.notes.create(body, userId)
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