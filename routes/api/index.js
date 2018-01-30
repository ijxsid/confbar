import express from 'express'
import profiles from './profiles'
import conferences from './conferences'
import speakers from './speakers'
import technologies from './technologies'
import videos from './videos'


const router = express.Router()

router.use('/conferences', conferences)
router.use('/me', profiles)
router.use('/speakers', speakers)
router.use('/technologies', technologies)
router.use('/videos', videos)

export default router
