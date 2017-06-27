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

  server.get('/auth', (req, res) => {
    if (req.query.jwt) {
      res.cookie('token', req.query.jwt, { maxAge: 60 * 60 * 24 * 100, httpOnly: true, path: '/' })
    }
    return app.render(req, res, '/auth', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.PORT}`)
  })
})
