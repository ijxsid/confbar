import express from 'express'
import profile from './profile'
import conference from './conference'
import speaker from './speaker'

const router = express.Router()

conference(router)
profile(router)
speaker(router)

export default router
