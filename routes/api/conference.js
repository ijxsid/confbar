import passport from 'passport'

import { isValidObjectID, ConflictError } from './utils'
import Conference from '../../models/Conference'

export default function conference (router) {
  router.post('/conferences/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const currentTime = (new Date()).getTime()
      const data = Object.assign({}, req.body, {
        addedBy: req.user._id,
        createdAt: currentTime
      })

      Conference
        .find({'name': data.name, 'year': data.year})
        .exec()
        .then((confs) => {
          if (confs.length > 0) {
            throw new Error(`Conference ${data.name} already exists for year ${data.year}`)
          }
          let conf = new Conference(data)
          return conf.save()
        })
        .catch(err => {
          // Conference Already Exists. Conflict Error.
          if (err instanceof ConflictError) {
            res.status(409).json({
              info: err.message
            })
          } else {
            throw err
          }
        })
        .then((savedconf) => {
          return res.json(savedconf)
        })
        .catch((err) => {
          return res.status(400).json({err})
        })
    }
  )

  router.get('/conferences/', (req, res) => {
    const { page, search } = req.query

    Conference
      .find({name: {'$regex': search || '', '$options': 'i'}})
      .skip((page || 0) * 20)
      .limit(20)
      .exec()
      .then((confs) => {
        return res.status(200).send(confs)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
  })
}
