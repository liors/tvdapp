const express = require('express')
const next = require('next')
const path = require('path')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const port = parseInt(process.env.PORT, 10) || 3020
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const api = require('./server/api')

app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({
      extended: true
    }));
    
    server.get('/api/shows/new', (req, res) => api.get('tv-list-1').then(json => res.send(json)))

    server.get('/api/shows/popular', (req, res) => api.get('tv-list-2').then(json => res.send(json)))

    server.get('/api/shows/fresh', (req, res) => api.get('tv-list-3').then(json => res.send(json)))

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })