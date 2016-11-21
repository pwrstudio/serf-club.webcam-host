// Dependencies
var mongoose = require('mongoose')
var colors = require('colors')
// Models
var Stream = require('../models/stream.js')
// Config
var config = require('../config/config.js')
// Modules
var state = require('./state.js')

var director = {
  start: function start (app, io) {
    console.log('serf.club.engine'.bgBlack.bold)
    // Connect to database
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongodbUri)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    // Wait for the database connection to establish, then start the app.
    db.once('open', function () {

      console.log('db open'.bgCyan)

      setInterval(function () {
        Stream
          .find({
            'Format': 'mjpg'
          })
          .exec(function (err, streams) {
            if (err) { console.log(err) }
            console.log(streams[Math.floor(Math.random() * (streams.length + 1))])
          })
      }, 10000)

    })
  }
}

module.exports = director
