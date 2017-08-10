import passport from 'passport'
import mongoose from 'mongoose'


import Conference from '../../models/Conference'


function isValidObjectID (string) {
  return mongoose.Types.ObjectId.isValid(string)
}

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
            return res.status(409).json({
              info: `Conference ${data.name} already exists for year ${data.year}`
            }) // Conflict.
          }
          let conf = new Conference(data)
          return conf.save()
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
