const { AuthService, UserService, EmailService } = require('../services')
const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp');
require('dotenv').config()
const { HttpCode } = require('../helpers/constants.js')
const ErrorHandler = require('../helpers/errorHandler')
const createFolderIsExist = require('../helpers/createDir')
const { nanoid } = require('nanoid')
const serviceUser = new UserService()
const serviceAuth = new AuthService()

const AVATARS_DIR = process.env.AVATARS_DIR


const reg = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await serviceUser.findByEmail(email)
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                data: 'Conflict',
                message: 'Email is already use',
            })
        }
        const verifyToken = nanoid()
        const emailService = new EmailService(process.env.NODE_ENV)
        await emailService.sendEmail(verifyToken, email, name)
        const newUser = await serviceUser.create({ name, email, password, verify: false, verifyToken })

        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar,
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

const verify = async (req, res, next) => {
    try {
        const user = await serviceUser.findByVerifyToken(req.params.token)

        if (user) {
            await serviceUser.updateVerifyToken(user.id, true, null)//userID,isVerify,up token in null
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                message: 'Verification successful!'
            })
        }

        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message: 'link is not valid'
        })
    } catch (error) {
        next(error)
    }
}

const avatars = async (req, res, next) => {
    try {
        const id = req.user.id
        const avatarUrl = await saveAvatarToStatic(req)
        await serviceUser.updateAvatar(id, avatarUrl)
        return res.json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                avatar: avatarUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

const saveAvatarToStatic = async (req) => {
    const id = req.user.id
    const pathFile = req.file.path
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const newAvatarFileName = `${uniqueSuffix}-${req.file.originalname}`
    const img = await Jimp.read(pathFile)
    await img
        .autocrop()
        .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(pathFile)
    await createFolderIsExist(path.join(AVATARS_DIR, id))
    await fs.rename(pathFile, path.join(AVATARS_DIR, id, newAvatarFileName))
    const avatarUrl = path.normalize(path.join(id, newAvatarFileName))
    try {
        fs.unlink(path.join(process.cwd(), AVATARS_DIR, req.user.avatar))
    } catch (error) {
        console.log(error)
    }
    return avatarUrl
}

module.exports = {
    reg,
    login,
    logout,
    avatars,
    verify
}