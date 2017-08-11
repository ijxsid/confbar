import passport from 'passport'

import { isValidObjectID, ConflictError } from './utils'
import Video from '../../models/Video'

export default function conference (router) {
  router.post('/videos/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const currentTime = (new Date()).getTime()
      const data = Object.assign({}, req.body, {
        addedBy: req.user._id,
        createdAt: currentTime
      })

      Video
        .find({'link': data.link})
        .exec()
        .then((videos) => {
          if (videos.length > 0) {
            throw new ConflictError(`Video ${data.link} already exists.`)
          }
          let video = new Video(data)
          return video.save()
        })
        .catch(err => {
          // Technology Already Exists. Conflict Error.
          if (err instanceof ConflictError) {
            res.status(409).json({
              info: err.message
            })
          } else {
            throw err
          }
        })
        .then((savedvideo) => {
          return res.json(savedvideo)
        })
        .catch((err) => {
          return res.status(400).json({err})
        })
    }
  )

  router.get('/videos/', (req, res) => {
    const { page, search } = req.query

    Video
      .find({name: {'$regex': search || '', '$options': 'i'}})
      .populate('conference')
      .populate('speaker')
      .populate('tags')
      .skip((page || 0) * 20)
      .limit(20)
      .exec()
      .then((videos) => {
        return res.status(200).send(videos)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
  })
}
