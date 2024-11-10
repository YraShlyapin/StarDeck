import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const userRoute = express.Router()

userRoute.post('/User', async (req, res) => {
    await prisma.User.create({
        data: req.body
    }) 
        .then(o => {
            res.status(201).send(o)
        })
})
