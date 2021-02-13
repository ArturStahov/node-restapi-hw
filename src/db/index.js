const low = require('lowdb')
const patch = require('path')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(patch.join(__dirname, '..', '..', 'data', 'db.json'))
const db = low(adapter)

db.defaults({ notes: [] })
    .write()

module.exports = db
