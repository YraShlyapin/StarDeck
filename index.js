import express from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'

import router from './js/api.js'

import 'dotenv/config'

const app = express()

const port = process.env.PORT || 80

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, (err) => {
    if (err) throw err
    console.log(`server started http://localhost:${port}`)
})