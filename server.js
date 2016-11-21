// Dependencies
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var server = app.listen(port)
var io = require('socket.io').listen(server)

// Modules
var director = require('./app/director.js')

// Start
director.start(app, io)
