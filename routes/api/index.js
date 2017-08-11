import express from 'express'
import profile from './profile'
import conference from './conference'
import speaker from './speaker'
import technology from './technology'
import video from './video'


const router = express.Router()

conference(router)
profile(router)
speaker(router)
technology(router)
video(router)

export default router
