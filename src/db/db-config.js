const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const createUrl = () => {
    const user = process.env.User;
    const pass = process.env.Pass;
    const urlEnd = process.env.UrlEnd
    return `mongodb+srv://${user}:${pass}${urlEnd}`;
}

const uri = createUrl()

process.on('SIGINT', async () => {
    const client = await db
    client.close()
    console.log('Connection for DB disconnected and app terminated')
    process.exit()
})

const db = new MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db