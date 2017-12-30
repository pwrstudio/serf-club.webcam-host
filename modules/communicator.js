'use strict'
// Dependencies
const express = require('express')
const app = express()
const port = process.env.PORT || 7070
const server = app.listen(port)
const io = require('socket.io').listen(server)
const state = require('./state.js')

const communicator = {
  init: function init() {
    io.on('connection', function(socket) {
      socket.emit('init', state)
    })
  },
  crossCut: function crossCut() {
    io.emit('crosscut', state)
  },
  jumpCut: function jumpCut() {
    io.emit('jumpcut', state)
  },
  subtitle: function subtitle() {
    io.emit('subtitle', state)
  },
  audioTwo: function audioTwo() {
    io.emit('audiotwo', state)
  },
  audioOne: function audioOne() {
    io.emit('audioone', state)
  }
}

module.exports = communicator
