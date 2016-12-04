// Dependencies
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var server = app.listen(port)
var io = require('socket.io').listen(server)
var state = require('./state.js')

var communicator = {
  init: function init() {
    console.log('socket initialization...')
    io.on('connection', function (socket) {
      console.log(socket.id)
      socket.emit('init', state)
    })
  },
  updateState: function updateState() {
    io.emit('state', state)
  }
}

module.exports = communicator
