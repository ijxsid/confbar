import passport from 'passport'

import { isValidObjectID, ConflictError } from './utils'
import Technology from '../../models/Technology'

export default function conference (router) {
  router.post('/technologies/',
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
            throw new Error(`Technology ${data.name} already exists.`)
          }
          let tech = new Technology(data)
          return tech.save()
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

  router.get('/technologies/', (req, res) => {
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
}
