// Dependencies
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var server = app.listen(port)
var io = require('socket.io').listen(server)

var communicator = {
  init: function init() {
    io.on('connection', function (socket) {
      console.log('connection made')
      socket.emit('init', {
        state: 'x'
      })
    })
  },

}

module.exports = communicator
