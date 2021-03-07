const User = require('../schemas/user.js')
const ObjectId = require('mongoose').Types.ObjectId;
const { HttpCode } = require('../helpers/constants.js')
const { ErrorHandler } = require('../helpers/errorHandler')

class UsersRepository {
    constructor() {
        this.model = User
    }

    _checkId(id) {
        if (!ObjectId.isValid(id)) {
            throw new ErrorHandler(HttpCode.BAD_REQUEST, `id: not valid!`, "Bad Request")
        }
    }

    async create(body) {
        const user = new this.model(body)
        return user.save()
    }

    async updateToken(id, token) {
        await this.model.updateOne({ _id: id }, { token })
    }
    async findByID(id) {
        this._checkId(id)
        const result = await this.model.findOne({ _id: id })
        return result
    }

    async findByEmail(email) {
        this._checkId(id)
        const result = await this.model.findOne({ email })
        return result
    }

}

module.exports = UsersRepository