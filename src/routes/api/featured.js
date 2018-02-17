import passport from 'passport'
import express from 'express'
import { addModel } from './utils'
import Feature from '../../models/Feature'
const router = express.Router()

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    const currentTime = (new Date()).getTime()

    if (!req.body.type) {
      return res.status(400).json({info: `type is required`})
    }

    const data = Object.assign({}, req.body, {
      addedBy: req.user._id,
      createdAt: currentTime
    })

    addModel(Feature, data)
      .then((savedfeature) => {
        return res.json(savedfeature)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
  }
)

router.get('/', (req, res) => {
  Feature
    .find({})
    .sort('index')
    .populate({
      path: 'items',
      populate: [{ path: 'conference' }, {path: 'speaker'}, {path: 'tags'}]
    })
    .exec()
    .then((features) => {
      return res.status(200).json(features)
    })
    .catch((err) => {
      return res.status(400).json({err})
    })
})


router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params

    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    Feature
      .findById(id)
      .exec()
      .then((feature) => {
        if (feature) {
          if (Object.keys(req.body).length > 0) {
            const data = Object.assign({}, req.body, {
              lastModifiedAt: Date.now(),
              lastModifiedBy: req.user._id
            })
            feature.updateData(data)
            return feature.save()
          } else {
            return feature
          }
        } else {
          res.status(404).json({info: `feature with id:${id} does not exist.`})
        }
      })
      .then(feature => {
        console.log('Feature Updated.')
        return res.status(200).json(feature)
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

    Feature
      .findById(id)
      .exec()
      .then((feature) => {
        if (feature) {
          return feature.remove()
        } else {
          res.status(404).json({info: `Feature with id:${id} does not exist.`})
        }
      })
      .then(feature => {
        console.log('Fideo Removed.')
        return res.status(200).json(feature)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })
export default router
