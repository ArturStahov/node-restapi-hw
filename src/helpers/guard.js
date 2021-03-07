
const passports = require('passport')
require('../config/passport')
const { HttpCode } = require('../helpers/constants.js')


const guard = (req, res, next) => {
    passports.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return next({
                status: HttpCode.FORBIDDEN,
                message: 'FORBIDDEN!'
            })
        }
        req.user = user
        return next()
    })(req, res, next)
    next()
}

module.exports = guard