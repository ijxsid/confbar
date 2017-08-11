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
