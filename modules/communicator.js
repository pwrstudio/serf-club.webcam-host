const express = require('express')
const app = express()
const port = process.env.PORT || 7070
const server = app.listen(port)
const io = require('socket.io').listen(server)
const state = require('./state.js')

module.exports = {
  init() {
    io.on('connection', socket => {
      socket.emit('init', state)
    })
  },
  crossCut() {
    io.emit('crosscut', state)
  },
  jumpCut() {
    io.emit('jumpcut', state)
  },
  subtitle() {
    io.emit('subtitle', state)
  },
  audioTwo() {
    io.emit('audiotwo', state)
  },
  audioOne() {
    io.emit('audioone', state)
  }
}
