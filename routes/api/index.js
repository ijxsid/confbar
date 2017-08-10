import express from 'express'
import profile from './profile'
import conference from './conference'

const router = express.Router()

conference(router)
profile(router)

export default router
