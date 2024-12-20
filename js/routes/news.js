import express from 'express'
import { PrismaClient } from '@prisma/client'
import { io } from 'socket.io-client'

const prisma = new PrismaClient()
const newsRoute = express.Router()
const socket = io('ws://localhost:81')

newsRoute.post('/News', async (req, res) => {
    await prisma.News.create({
        data: req.body
    })
        .then(o => {
            res.status(201).send(o)
        }) 
} )

newsRoute.get('/AllNews', async (req, res) => {
    await prisma.News.findMany({
        orderBy: [
            {
                published_data: 'desc'
            }
        ]
    }) 
        .then(o => {
            res.status(200).send(o)
        })
})


newsRoute.route('/News/:id')
    .get(async (req, res) => {
        await prisma.News.findFirst({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
    })
    .delete(async (req, res) => {
        await prisma.News.delete({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
    })

export default newsRoute