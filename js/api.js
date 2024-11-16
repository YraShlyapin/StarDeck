import express from 'express'
import homeworkRoute from './routes/homework.js'
import subjectRoute from './routes/subject.js'
import newsRoute from './routes/news.js'
import themesRoute from './routes/themes.js'
import userRoute from './routes/user.js'

const router = express.Router()

router.use(homeworkRoute)
router.use(subjectRoute)
router.use(newsRoute)
router.use(themesRoute)
router.use(userRoute)

export default router
