import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import morgan from 'morgan'
import myRoutes from './routes/index'
import config from './config'
import User from './models/User'
import authTwitter from './authTwitter'
import jwtStrategy from './jwtStrategy'

/**
 * configureApp - adds configuration and bootstraps express App.
 *
 * @returns {object}  Express App Object
 */

function configureApp () {
  const app = express()
  mongoose.connect(config.database.url)

  mongoose.connection.on('error', function (err) {
    console.error('MongoDB error: %s', err)
  })


  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
  })

  app.use(session({
    secret: config.express.secret,
    maxAge: 3600 * 1000,
    resave: false,
    saveUninitialized: false
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))

  passport.use(authTwitter)
  passport.use(jwtStrategy)
  passport.serializeUser((user, cb) => {
    cb(null, user._id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
  app.use(passport.initialize())

  app.use(morgan('dev'))

  myRoutes(app)
  app.use('/', express.static('public'))

  return app
}

mongoose.Promise = global.Promise
const app = configureApp()


app.listen(config.server.PORT, () => {
  console.log('Server running at 127.0.0.1:' + config.server.PORT)
})
