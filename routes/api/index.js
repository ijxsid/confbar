import express from 'express'
import profile from './profile'
import conference from './conference'
import speaker from './speaker'
import technology from './technology'


const router = express.Router()

conference(router)
profile(router)
speaker(router)
technology(router)

export default router
