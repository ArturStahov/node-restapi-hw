const { HttpCode } = require('../helpers/constants.js')
const { NotesService } = require('../services')

const notesService = new NotesService();

const getAll = async (req, res, next) => {
    try {
        const notes = await notesService.getAll()
        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                notes,
            }
        })
    } catch (error) {
        next(error)
    }
}

const getByID = async (req, res, next) => {
    try {
        const note = await notesService.getByID(req.params)

        if (note) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    note,
                }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const note = await notesService.create(req.body)
        res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                note,
            }
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const note = await notesService.update(req.params, req.body)

        if (note) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    note,
                }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const patch = async (req, res, next) => {
    try {
        const note = await notesService.update(req.params, req.body)

        if (note) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    note,
                }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const note = await notesService.remove(req.params)

        if (note) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAll,
    getByID,
    create,
    update,
    patch,
    remove
}