// Dependencies
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const server = app.listen(port)
const io = require('socket.io').listen(server)
const state = require('./state.js')

const communicator = {
  init: function init () {
    io.on('connection', function (socket) {
      console.log(socket.id)
      socket.emit('init', state)
    })
  },
  crossCut: function crossCut () {
    io.emit('crosscut', state)
  },
  jumpCut: function jumpCut() {
    io.emit('jumpcut', state)
  },
  subtitle: function aubtitle () {
    io.emit('subtitle', state)
  },
  audioTwo: function audioTwo () {
    console.log('emit audio2');
    io.emit('audiotwo', state)
  },
  audioOne: function audioOne () {
    console.log('emit audio1');
    io.emit('audioone', state)
  }
}

module.exports = communicator
