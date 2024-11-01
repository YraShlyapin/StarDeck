import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const themesRoute = express.Router()

themesRoute.post('/Theme', async (req, res) => {
    await prisma.Themes.create({
        data: req.body
    }) 
        .then(o => {
            res.status(201).send(o)
        })
})

themesRoute.post('/Themes', async (req, res) => {
    await prisma.Themes.createMany({
        data: req.body
    }) 
        .then(o => {
            res.status(201).send(o)
        })
})

themesRoute.get('/AllThemes', async (req, res) => {
    await prisma.Themes.findMany({
    }) 
        .then(o => {
            res.status(200).send(o)
        })
})

themesRoute.route('/Theme/:id')
    .get(async (req, res) => {
        await prisma.Themes.findFirst({
            where: {
                id: Number(req.params.id)
            },
            include: {
                coosen_user: {
                    select: {
                        name: true
                    }
                }
            }
        })
            .then(o => {
                res.status(200).send(o) 
            })
    })
    .delete(async (req, res) =>{
        await prisma.Themes.delete({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                res.status(200).send(o)
            })
    })

themesRoute.put('/SelectTheme', async (req, res) => {
    await prisma.Themes.update({
        where: {
            id: req.body.id_theme
        },
        data: {
            id_user: req.body.id_user
        }
    })
        .then(o => {
            res.status(200).send(o) 
        })
})

themesRoute.put('/DeselectTheme', async (req, res) => {
    await prisma.Themes.update({
        where: {
            id: req.body.id_theme
        },
        data: {
            id_user: null
        }
    })
        .then(o => {
            res.status(200).send(o) 
        })
})

themesRoute.get('/AllThemes/:id_homework', async (req, res) => {
    await prisma.Themes.findFirst({
        where: {
            id_homework: Number(req.params.id_homework)
        }
    })
        .then(o => {
            res.status(200).send(o) 
        })
})

export default themesRoute