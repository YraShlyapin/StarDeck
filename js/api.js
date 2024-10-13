import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

//начинайте писать свой код здесь
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

export default router