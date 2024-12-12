import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const homeworkRoute = express.Router()

homeworkRoute.post("/Homework", async (req, res) => {
    await prisma.Homework.create({
        data: req.body
    })
        .then(o => res.send(o))
})

homeworkRoute.get('/AllHomeworks', async (req, res) => {
    await prisma.Homework.findMany({
        include: {
            subject: {
                select: {
                    name: true
                }
            }
        },
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

homeworkRoute.route('/Homework/:id')
    .get(async (req, res) => {
        await prisma.Homework.findFirst({
            include: {
                subject: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
    })
    .delete(async (req, res) => {
        await prisma.Homework.delete({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
            .catch(e => {
                res.status(404)
            })
    })


homeworkRoute.put('/changeStatus/:id', async (req, res) => {
    let now = await prisma.Homework.findFirst({
        where: {
            id: Number(req.params.id)
        }
    })
    
    await prisma.Homework.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            status: !now.status
        }
    })
        .then(o => {
            res.status(200).send(o)
        })
})
    
export default homeworkRoute