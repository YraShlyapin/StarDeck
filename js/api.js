import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

//начинайте писать свой код здесь
router.post('/News', async (req, res) => {
    await prisma.News.create({
        data: req.body
    })
        .then(o => {
            res.status(201).send(o)
        }) 
} )
router.route('/News/:id')
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
                id: Number(rew.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
    })
export default router
