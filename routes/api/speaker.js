import passport from 'passport'
import mongoose from 'mongoose'


import Speaker from '../../models/Speaker'


function isValidObjectID (string) {
  return mongoose.Types.ObjectId.isValid(string)
}

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
          res.status(409).json({
            info: err.message
          })
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
}
