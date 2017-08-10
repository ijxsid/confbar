import express from 'express'
import config from '../config'
import passport from 'passport'

const router = express.Router()


router.get('/twitter',
  passport.authenticate('twitter', {
    session: false
  })
)

router.get('/guess/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user) {
      res.json({info: 'successfully-booted-up', user: req.user, token: req.user.appToken})
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
    // Cookie Age is set to about 100 days.
    res.cookie('token', req.user.appToken, { maxAge: 60 * 60 * 24 * 100, httpOnly: true, path: '/' })
    // Redirect to frontend server with the access token in the request
    res.redirect(`${config.frontend.server}auth`)
  })


export default router
