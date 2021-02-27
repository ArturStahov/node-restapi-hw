
const Notes = require('../schemas/notes.js')


class NotesRepository {
    constructor() {
        this.model = Notes
    }

    async getAll() {
        const results = await this.model.find({})
        return results
    }

    async getByID(id) {
        const result = await this.model.findOne({ _id: id })
        return result
    }

    async create(body) {
        const result = await this.model.create(body)
        return result
    }

    async update(id, body) {
        const result = await this.model.findByIdAndUpdate({ _id: id }, { ...body }, { new: true })
        return result
    }

    async remove(id) {
        const result = await this.model.findByIdAndRemove({ _id: id })
        return result
    }
}


module.exports = NotesRepository