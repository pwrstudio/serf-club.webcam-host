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
  updateState: function updateState () {
    io.emit('state', state)
  }
}

module.exports = communicator
