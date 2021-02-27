const express = require('express')
const cors = require('cors')
const fs = require("fs")
const path = require('path')
const logger = require('morgan');
const { HttpCode } = require('./helpers/constants.js')
const routerNotes = require('./api/notes')

const app = express()

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })

app.use(logger('dev'))
app.use(logger("common", {
    format: "[:date[clf]] :method :url :status :response-time ms",
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
}))

app.use(cors())
app.use(express.json())
app.use('/api/notes', routerNotes)


//error 404
app.use((req, res, next) => {
    res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: `Use api on routes ${req.baseUrl}/api/notes`,
        data: 'Not Found'
    })
})

//error handler
app.use((err, req, res, next) => {
    err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
    res.status(err.status).json({
        status: err.status === 500 ? 'fair' : 'error',
        code: err.status,
        message: err.message,
        data: err.status === 500 ? 'Internal Server Error' : err.data,
    })
})


module.exports = app

