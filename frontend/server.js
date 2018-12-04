import express from 'express'
import cookieParser from 'cookie-parser'
import next from 'next'


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser())


    server.get('/conference/:id/:slug?', (req, res) => {
      return app.render(req, res, '/conference', { id: req.params.id })
    })

    server.get('/c/:id/:slug?', (req, res) => {
      return app.render(req, res, '/conference', { id: req.params.id })
    })

    server.get('/video/:id/:slug?', (req, res) => {
      return app.render(req, res, '/video', { id: req.params.id })
    })

    server.get('/v/:id/:slug?', (req, res) => {
      return app.render(req, res, '/video', { id: req.params.id })
    })

    server.get('/tag/:id/:slug?', (req, res) => {
      return res.redirect(`/technology/${req.params.id}/${req.params.slug}`)
    })

    server.get('/technology/:id/:slug?', (req, res) => {
      return app.render(req, res, '/technology', { id: req.params.id })
    })

    server.get('/t/:id/:slug?', (req, res) => {
      return app.render(req, res, '/technology', { id: req.params.id })
    })

    server.get('/speaker/:id/:slug?', (req, res) => {
      return app.render(req, res, '/speaker', { id: req.params.id })
    })

    server.get('/s/:id/:slug?', (req, res) => {
      return app.render(req, res, '/speaker', { id: req.params.id })
    })

    server.get('/authenticated', (req, res) => {
      return app.render(req, res, '/authenticated', req.query)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${process.env.PORT}`)
    })
  })
