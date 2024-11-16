import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const userRoute = express.Router()

const json = (param) => {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  };

userRoute.post('/User', async (req, res) => {
    await prisma.User.create({
        data: req.body
    }) 
        .then(o => {
            res.status(201).send(json(o))
        })
})

userRoute.get('/User/:id', async (req, res) => {
    await prisma.User.findFirst({
        where: {
            chat_id: Number(req.params.id)
        }
    })
        .then(o => {
            res.status(201).send(json(o))
        })
})

userRoute.put('/setRole/:id', async (req, res) => {
    await prisma.User.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            role: req.body.role
        }
    }) 
        .then(o => {
            res.status(201).send(o)
        })
})

export default userRoute