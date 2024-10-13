import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post("/Homework", async (req, res) => {
    await prisma.Homework.create({
        data: req.body
    })
        .then(asd => res.send(asd))
})
router.route('/Homework/:id')
    .get(async (req, res) => {
        await prisma.Homework.findFirst({
            where: {
                id: Number(req.params.id)
            },
            include: {
                subject: true
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
        .then(o=>{
            res.status(200).send(0)
        })
    })

router.post('/Subject', async(req, res) => {
    await prisma.Subject.create({
        data: req.body 
    }) 
    .then(o => {
        res.status(201).send(o)
    })
})
router.route('/Subject/:id')
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


export default router