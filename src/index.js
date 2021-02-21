const app = require('./app.js')
const db = require('./db/db-config.js')

const PORT = process.env.PORT || 3000

async function startApp() {
    try {
        await db
        app.listen(PORT, () => {
            console.log(`server running.Use our Api on port:${PORT}`)
        })
    } catch (error) {
        console.log(`Server not running ! Error :${error.message}`)
    }
}

startApp()
