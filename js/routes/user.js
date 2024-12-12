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

userRoute.put('/setRole/:id/:role', async (req, res) => {
    await prisma.User.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            role: req.params.role
        }
    }) 
        .then(o => {
            res.sendStatus(201)
        })
})

userRoute.put('/setCurrentSubject/:id/:id_subject', async (req, res) => {
    await prisma.User.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            current_Subject: Number(req.params.id_subject)
        }
    }) 
        .then(o => {
            res.sendStatus(201)
        })
})

// userRoute.put('/changeRole/:id', async (req, res) => {
//     let current_role = await prisma.User.findFirst({
//         where: {
//             id: Number(req.params.id)
//         },
//         select: {
//             role: true
//         }
//     })

//     await prisma.User.update({
//         where: {
//             id: Number(req.params.id)
//         },
//         data: {
//             role: current_role=="USER" ? "HEADMAN" : "USER"
//         }
//     }) 
//         .then(o => {
//             res.sendStatus(201)
//         })
// })

userRoute.put('/setActivity/:id/:activity', async (req, res) => {
    await prisma.User.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            activity: Number(req.params.activity)
        }
    }) 
        .then(o => {
            res.sendStatus(201);
        })
})

export default userRoute