import passport from 'passport'
import express from 'express'
import { ConflictError, addModel } from './utils'
import Speaker from '../../models/Speaker'
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

    Speaker
      .find({'name': data.name, 'twitterUsername': data.twitterUsername})
      .exec()
      .then((speakers) => {
        if (speakers.length > 0) {
          throw new ConflictError(`Speaker ${data.name}(${data.twitterUsername}) already exists.`)
        }
        return addModel(Speaker, data)
      })
      .catch(err => {
        // Speaker Already Exists. Conflict Error.
        console.log(err)
        if (err instanceof ConflictError) {
          res.status(409).json({
            info: err.message
          })
        } else {
          throw err
        }
      })
      .then((savedspeaker) => {
        return res.json(savedspeaker)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
  }
)

router.get('/', (req, res) => {
  const { page, search } = req.query

  Speaker
    .find({name: {'$regex': search || '', '$options': 'i'}})
    .skip((page || 0) * 20)
    .limit(20)
    .exec()
    .then((speakers) => {
      return res.status(200).send(speakers)
    })
    .catch((err) => {
      return res.status(400).json({err})
    })
})

router.get('/:id/', (req, res) => {
  const { id } = req.params

  const speakerQuery = Speaker.findById(id).exec()
  const videosQuery = Video.find({ speaker: id }).populate('conference').populate('tags').exec()

  Promise.all([speakerQuery, videosQuery])
    .then(([speaker, videos]) => {
      return res.status(200).send({speaker, videos})
    })
    .catch(err => {
      return res.status(400).json({err})
    })
})

router.put('/:id/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params

    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    Speaker
      .findById(id)
      .exec()
      .then((speaker) => {
        if (speaker) {
          if (Object.keys(req.body).length > 0) {
            const data = Object.assign({}, req.body, {
              lastModifiedAt: Date.now(),
              lastModifiedBy: req.user._id
            })
            speaker.updateData(data)
            return speaker.save()
          } else {
            return speaker
          }
        } else {
          res.status(404).json({info: `speaker with id:${id} does not exist.`})
        }
      })
      .then(speaker => {
        console.log('Speaker Updated.')
        return res.status(200).json(speaker)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })


export default router
