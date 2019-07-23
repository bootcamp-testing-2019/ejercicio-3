import * as express from 'express'
import * as path from 'path'

const router = express.Router()

// Every request to the app renders the public/index.html file and lets React
// do the routing on the client side
router.get('*', (req,res) => {
    const appIndexFilePath = path.join(__dirname + '/../public/index.html')

    res.sendFile(appIndexFilePath)
})

export {router}
