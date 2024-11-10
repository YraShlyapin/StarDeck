import express from 'express'
import { Server } from 'socket.io'

import cors from 'cors'
import bodyParser from 'body-parser'

import router from './js/api.js'

import 'dotenv/config'



const app = express()

const port_api = process.env.PORT_API || 80
const port_socket = process.env.PORT_SOCKET || 81

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)



const io = new Server(port_socket)

io.on('connection', client => {
    client.on('message', m => console.log(m))
})



app.listen(port_api, (err) => {
    if (err) throw err
    console.log(`api started http://localhost:${port_api}`)
    console.log(`ws started ws://localhost:${port_socket}`)
})