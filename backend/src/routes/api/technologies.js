import passport from 'passport'
import express from 'express'
import { ConflictError, addModel } from './utils'
import Technology from '../../models/Technology'
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

    Technology
      .find({'name': data.name})
      .exec()
      .then((techs) => {
        if (techs.length > 0) {
          throw new ConflictError(`Technology ${data.name} already exists.`)
        }
        return addModel(Technology, data)
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
      .then((savedtech) => {
        return res.json(savedtech)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
  }
)

router.get('/', (req, res) => {
  const { page, search } = req.query

  Technology
    .find({name: {'$regex': search || '', '$options': 'i'}})
    .skip((page || 0) * 20)
    .limit(20)
    .exec()
    .then((techs) => {
      return res.status(200).send(techs)
    })
    .catch((err) => {
      return res.status(400).json({err})
    })
})

router.get('/:id/', (req, res) => {
  const { id } = req.params

  const techQuery = Technology.findById(id).exec()
  const videosQuery = Video.find({tags: id}).populate('channel').populate('conference').populate('speaker').populate('tags').exec()

  Promise.all([techQuery, videosQuery])
    .then(([tag, videos]) => {
      return res.status(200).send({tag, videos})
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

    Technology
      .findById(id)
      .exec()
      .then((tech) => {
        if (tech) {
          if (Object.keys(req.body).length > 0) {
            const data = Object.assign({}, req.body, {
              lastModifiedAt: Date.now(),
              lastModifiedBy: req.user._id
            })
            tech.updateData(data)
            return tech.save()
          } else {
            return tech
          }
        } else {
          res.status(404).json({info: `Tag with id:${id} does not exist.`})
        }
      })
      .then(tech => {
        console.log('Tag Updated.')
        return res.status(200).json(tech)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })

export default router
