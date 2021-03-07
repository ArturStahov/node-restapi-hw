const { AuthService, UserService } = require('../services')
const { HttpCode } = require('../helpers/constants.js')
const ErrorHandler = require('../helpers/errorHandler')
const serviceUser = new UserService()
const serviceAuth = new AuthService()

const reg = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await serviceUser.findByEmail(email)
        if (user) {
            throw new ErrorHandler(HttpCode.CONFLICT, 'This email is already use', 'Conflict')
        }
        const newUser = await serviceUser.create({ name, email, password })
        const token = await serviceAuth.login({ email, password })

        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await serviceAuth.login({ email, password })
        if (token) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    token
                }
            })
        }
        throw new ErrorHandler(HttpCode.UNAUTHORIZED, 'Invalid Credential', 'Invalid')
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const id = req.user.id
        await serviceAuth.logout(id)
        return res.status(HttpCode.NO_CONTENT).json({})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    reg,
    login,
    logout
}