import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import 'dotenv/config'

const app = express()
const prisma = new PrismaClient()

const port = process.env.PORT || 80

app.use(cors())

app.use(async (req, res) => {
    if (req.query.q == 1){
        await prisma.asd.createMany({
            data: [
            {name: '123'},
            {name: 'ss'},
            {name: 'asd'},
            {name: 'asd'},
            ]
        })
        res.send('created')
    } else {
        await prisma.asd.findMany()
        .then(o => {
            res.send(o)
        })
    }
})

app.listen(port, (err) => {
    console.log(`server started http://localhost:${port}`)
})