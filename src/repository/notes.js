const Notes = require('../schemas/notes.js')
const ObjectId = require('mongoose').Types.ObjectId;
const { HttpCode } = require('../helpers/constants.js')
const { ErrorHandler } = require('../helpers/errorHandler')

class NotesRepository {
    constructor() {
        this.model = Notes
    }

    async getAll() {
        const results = await this.model.find({})
        return results
    }

    _checkId(id) {
        if (!ObjectId.isValid(id)) {
            throw new ErrorHandler(HttpCode.BAD_REQUEST, `id: not valid!`, "Bad Request")
        }
    }

    async getByID(id) {
        this._checkId(id)
        const result = await this.model.findOne({ _id: id })
        return result
    }

    async create(body, userId) {
        const result = await this.model.create({ ...body, owner: userId })
        return result
    }

    async update(id, body) {
        this._checkId(id)
        const result = await this.model.findByIdAndUpdate({ _id: id }, { ...body }, { new: true })
        return result
    }

    async remove(id) {
        this._checkId(id)
        const result = await this.model.findByIdAndRemove({ _id: id })
        return result
    }
}


module.exports = NotesRepository