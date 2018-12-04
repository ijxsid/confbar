import passport from 'passport'
import express from 'express'
import { ConflictError } from './utils'
import Channel from '../../models/Channel'
import Video from '../../models/Video'

const router = express.Router()

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const currentTime = (new Date()).getTime()

    if (!req.body.type || !req.body.channelId) {
      return res.status(400).json({info: `type and channelId are required.`})
    }

    const data = Object.assign({}, req.body, {
      addedBy: req.user._id,
      createdAt: currentTime,
      _id: `${req.body.type}-${req.body.channelId}`
    })
    Channel
      .findById(data._id)
      .exec()
      .then((ch) => {
        if (ch) {
          throw new ConflictError(`Channel ${data._id} already exists`)
        }
        const channel = new Channel(data)
        return channel.save()
      })
      .catch(err => {
        // Conference Already Exists. Conflict Error.
        console.log(err, err.message)
        if (err instanceof ConflictError) {
          res.status(409).json({
            info: err.message
          })
        } else {
          throw err
        }
      })
      .then((savedchannel) => {
        return res.json(savedchannel)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
  }
)

router.get('/', (req, res) => {
  const { page, search } = req.query

  Channel
    .find({name: {'$regex': search || '', '$options': 'i'}})
    .skip((page || 0) * 20)
    .limit(20)
    .exec()
    .then((channels) => {
      return res.status(200).json(channels)
    })
    .catch((err) => {
      return res.status(400).json({err})
    })
})


router.get('/:id/', (req, res) => {
  const { id } = req.params

  const channelQuery = Channel.findById(id).exec()
  const videosQuery = Video.find({ channel: id }).populate('speaker').populate('tags').populate('conference').exec()

  Promise.all([channelQuery, videosQuery])
    .then(([channel, videos]) => {
      return res.status(200).send({channel, videos})
    })
    .catch(err => {
      return res.status(400).json({err})
    })
})

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params

    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    Channel
      .findById(id)
      .exec()
      .then((channel) => {
        if (channel) {
          if (Object.keys(req.body).length > 0) {
            const data = Object.assign({}, req.body, {
              lastModifiedAt: Date.now(),
              lastModifiedBy: req.user._id
            })
            channel.updateData(data)
            return channel.save()
          } else {
            return channel
          }
        } else {
          res.status(404).json({info: `conference with id:${id} does not exist.`})
        }
      })
      .then(channel => {
        console.log('Channel Updated.')
        return res.status(200).json(channel)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })

export default router
