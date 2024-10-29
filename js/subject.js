import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const subjectRoute = express.Router()

subjectRoute.post('/Subject', async (req, res) => {
    await prisma.Subject.create({
        data: req.body 
    }) 
        .then(o => {
            res.status(201).send(o)
        })
})

subjectRoute.get('/AllSubjects', async (req, res) => {
    await prisma.Subject.findMany({
    }) 
        .then(o => {
            res.status(200).send(o)
        })
})

subjectRoute.route('/Subject/:id')
    .get(async (req, res) => {
        await prisma.Subject.findFirst({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o) 
            })
    })
    .delete(async (req, res) =>{
        await prisma.Subject.delete({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
    })

export default subjectRoute