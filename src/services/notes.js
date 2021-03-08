const { NotesRepository } = require('../repository')


class NotesServices {
    constructor() {
        this.repositories = {
            notes: new NotesRepository()
        }
    }

    async getAll(userId) {
        const data = await this.repositories.notes.getAll(userId)
        return data
    }

    async getByID({ id }, userId) {
        const data = await this.repositories.notes.getByID(id, userId)
        return data
    }

    async create(body, userId) {
        const data = await this.repositories.notes.create(body, userId)
        return data
    }

    async update({ id }, body, userId) {
        const data = await this.repositories.notes.update(id, body, userId)
        return data
    }

    async remove({ id }, userId) {
        const data = await this.repositories.notes.remove(id, userId)
        return data
    }
}

module.exports = NotesServices