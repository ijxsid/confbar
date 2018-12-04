import express from 'express'
import Conference from '../../models/Conference'
import Video from '../../models/Video'
import Speaker from '../../models/Speaker'
import Technology from '../../models/Technology'

const router = express.Router()

router.get('/', (req, res) => {
  const { search, page } = req.query
  const conferencesQuery = Conference
    .find({'$text': { '$search': search || '', '$caseSensitive': false }})
    .skip((page || 0) * 10)
    .limit(10)
    .exec()
  const videosQuery = Video
    .find({'$text': { '$search': search || '', '$caseSensitive': false }})
    .skip((page || 0) * 10)
    .limit(10)
    .exec()
  const speakersQuery = Speaker
    .find({'$text': { '$search': search || '', '$caseSensitive': false }})
    .skip((page || 0) * 10)
    .limit(10)
    .exec()
  const techsQuery = Technology
    .find({'$text': { '$search': search || '', '$caseSensitive': false }})
    .skip((page || 0) * 10)
    .limit(10)
    .exec()

  Promise.all([conferencesQuery, videosQuery, speakersQuery, techsQuery])
    .then(([conferences, videos, speakers, tags]) => {
      res.status(200).json({ conferences, videos, speakers, tags })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({err})
    })
})

export default router
