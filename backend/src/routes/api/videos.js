import passport from 'passport'
import express from 'express'
import { ConflictError, addModel } from './utils'
import Video from '../../models/Video'

const router = express.Router()

router.post('/',
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
          throw new ConflictError(`Video ${data.link} already exists.`, videos[0].id)
        }
        return addModel(Video, data)
      })
      .catch(err => {
        // Video Already Exists. Conflict Error.
        if (err instanceof ConflictError) {
          res.status(409).json({
            err: true,
            info: err.message,
            id: err.id
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

router.get('/', (req, res) => {
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

router.get('/:id/', (req, res) => {
  const { id } = req.params

  Video
    .findById(id)
    .populate('conference')
    .populate('speaker')
    .populate('tags')
    .populate('channel')
    .exec()
    .then((video) => {
      if (video) {
        res.status(200).json(video)
      } else {
        res.status(404).json({ info: `video with id:${id} does not exist.` })
      }
    })
    .catch(err => {
      res.status(400).json({err})
    })
})

router.put('/:id/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params

    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    Video
      .findById(id)
      .exec()
      .then((video) => {
        if (video) {
          if (Object.keys(req.body).length > 0) {
            const data = Object.assign({}, req.body, {
              lastModifiedAt: Date.now(),
              lastModifiedBy: req.user._id
            })
            video.updateData(data)
            return video.save()
          } else {
            return video
          }
        } else {
          res.status(404).json({info: `video with id:${id} does not exist.`})
        }
      })
      .then(video => {
        console.log('Video Updated.')
        return res.status(200).json(video)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })

router.delete('/:id/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params

    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    Video
      .findById(id)
      .exec()
      .then((video) => {
        if (video) {
          return video.remove()
        } else {
          res.status(404).json({info: `video with id:${id} does not exist.`})
        }
      })
      .then(video => {
        console.log('Video Removed.')
        return res.status(200).json(video)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })

export default router
