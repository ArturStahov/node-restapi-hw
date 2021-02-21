
const { ObjectID } = require('mongodb')
const { HttpCode } = require('../helpers/constants.js')
const { ErrorHandler } = require('../helpers/errorHandler')


class NotesRepository {
    constructor(client) {
        this.collection = client.db().collection('notes')
    }

    _getMongoId(id) {
        try {
            return ObjectID(id)
        } catch (e) {
            throw new ErrorHandler(HttpCode.BAD_REQUEST, `MongoDb _id:${e.message}`, "Bad Request")
        }
    }

    async getAll() {
        const results = await this.collection.find({}).toArray()
        return results
    }

    async getByID(id) {
        const objectId = this._getMongoId(id);
        const [result] = await this.collection.find({ _id: objectId }).toArray()
        return result
    }

    async create(body) {
        const { ops: [result] } = await this.collection.insertOne(body)
        return result

    }

    async update(id, body) {
        const objectId = this._getMongoId(id);
        const { value: result } = await this.collection.findOneAndUpdate({ _id: objectId }, { $set: body }, { returnOriginal: false })
        return result
    }

    async remove(id) {

        const objectId = this._getMongoId(id);
        const { value: result } = await this.collection.findOneAndDelete({ _id: objectId })
        return result
    }
}


module.exports = NotesRepository