import express from 'express'
import homeworkRoute from './homework.js'
import subjectRoute from './subject.js'
import newsRoute from './news.js'

const router = express.Router()

router.use(homeworkRoute)
router.use(subjectRoute)
router.use(newsRoute)

export default router
