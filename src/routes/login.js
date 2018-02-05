import express from 'express'
import config from '../../config'
import passport from 'passport'

const router = express.Router()


router.get('/twitter',
  passport.authenticate('twitter', {
    session: false
  })
)

router.get('/twitter/return',
  passport.authenticate('twitter', {
    failureRedirect: '/login/twitter',
    session: false
  }),
  (req, res) => {
    // Cookie Age is set to about 100 days.
    let cookieProperties = { maxAge: 1000 * 60 * 60 * 24 * 100, path: '/' }

    if (config.frontend.cookieDomain) {
      cookieProperties.domain = config.frontend.cookieDomain
    }
    res.cookie('token', req.user.appToken, cookieProperties)
    // Redirect to frontend server with the access token in the request
    res.redirect(`${config.frontend.server}authenticated`)
  })


export default router
