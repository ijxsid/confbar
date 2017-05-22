import express from 'express'
import passport from 'passport'

const router = express.Router()


router.get('/twitter',
  passport.authenticate('twitter', {
    session: false
  })
)

router.get('/guess/user',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    if (req.user) {
      res.json({info: 'successfully-booted-up', user: req.user, token: req.user.accessToken})
    } else {
      res.json({info: 'successfully-booted-up', login: 'http://127.0.0.1:3001/login/twitter'})
    }
  }
)

router.get('/twitter/return',
  passport.authenticate('twitter', {
    failureRedirect: '/login/twitter',
    session: false
  }),
  (req, res) => {
    res.redirect('/login/guess/user?access_token' + req.user.accessToken)
  })


export default router
