import passport from 'passport'
import express from 'express'
import { isValidObjectID, ConflictError } from './utils'
import Conference from '../../models/Conference'
import Video from '../../models/Video'

const router = express.Router()

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const currentTime = (new Date()).getTime()
    const data = Object.assign({}, req.body, {
      addedBy: req.user._id,
      createdAt: currentTime,
      lastModifiedBy: req.user._id,
      lastModifiedAt: currentTime
    })

    Conference
      .find({'name': data.name, 'year': data.year})
      .exec()
      .then((confs) => {
        if (confs.length > 0) {
          throw new ConflictError(`Conference ${data.name} already exists for year ${data.year}`)
        }
        let conf = new Conference(data)
        return conf.save()
      })
      .catch(err => {
        // Conference Already Exists. Conflict Error.
        console.log(err, err.message);
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

router.get('/', (req, res) => {
  const { page, search } = req.query

  Conference
    .find({name: {'$regex': search || '', '$options': 'i'}})
    .skip((page || 0) * 20)
    .limit(20)
    .exec()
    .then((confs) => {
      return res.status(200).json(confs)
    })
    .catch((err) => {
      return res.status(400).json({err})
    })
})


router.get('/:id/', (req, res) => {
  const { id } = req.params

  if (!isValidObjectID(id)) return res.status(404).json({info: `conference with id:${id} does not exist.`})

  const conferenceQuery = Conference.findById(id).exec()
  const videosQuery = Video.find({ conference: id }).populate('speaker').populate('tags').exec()

  Promise.all([conferenceQuery, videosQuery])
    .then(([conference, videos]) => {
      return res.status(200).send({conference, videos})
    })
    .catch(err => {
      return res.status(400).json({err})
    })
})

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params

    if (!isValidObjectID(id)) return res.status(404).json({info: `conference with id:${id} does not exist.`})

    if (!req.user.isAdmin) return res.status(401).json({info: `Not Authorized to make this request.`})

    Conference
      .findById(id)
      .exec()
      .then((conf) => {
        if (conf) {
          if (Object.keys(req.body).length > 0) {
            const data = Object.assign({}, req.body, {
              lastModifiedAt: Date.now(),
              lastModifiedBy: req.user._id
            })
            conf.updateData(data)
            return conf.save()
          } else {
            return conf
          }
        } else {
          res.status(404).json({info: `conference with id:${id} does not exist.`})
        }
      })
      .then(conf => {
        console.log('Conference Updated.')
        return res.status(200).json(conf)
      })
      .catch(err => {
        return res.status(400).json({err})
      })
  })

export default router
