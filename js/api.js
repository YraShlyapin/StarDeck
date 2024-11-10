import express from 'express'
import homeworkRoute from './routes/homework.js'
import subjectRoute from './routes/subject.js'
import newsRoute from './routes/news.js'
import themesRoute from './routes/themes.js'

const router = express.Router()

router.use(homeworkRoute)
router.use(subjectRoute)
router.use(newsRoute)
router.use(themesRoute)

export default router
