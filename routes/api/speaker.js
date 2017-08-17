import passport from 'passport'

import { isValidObjectID, ConflictError } from './utils'
import Speaker from '../../models/Speaker'
import Video from '../../models/Video'

export default function speaker (router) {
  router.post('/speakers/',
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
            throw new Error(`Speaker ${data.name}(${data.twitterUsername}) already exists.`)
          }
          let speaker = new Speaker(data)
          return speaker.save()
        })
        .catch(err => {
          // Speaker Already Exists. Conflict Error.
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

  router.get('/speakers/', (req, res) => {
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

  router.get('/speakers/:id/', (req, res) => {
    const { id } = req.params

    if (!isValidObjectID(id)) return res.status(404).json({info: `speaker with id:${id} does not exist.`})

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

  router.put('/speakers/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { id } = req.params

      if (!isValidObjectID(id)) return res.status(404).json({info: `speaker with id:${id} does not exist.`})

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
}
