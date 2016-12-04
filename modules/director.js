// Dependencies
var mongoose = require('mongoose')
var colors = require('colors')
var Chance = require('chance')
var chance = new Chance()
// Models
var Stream = require('../models/stream.js')
// Config
var config = require('../config/config.js')
// Modules
var state = require('./state.js')
var communicator = require('./communicator.js')
var switcher = 0;


var director = {
  start: function start () {

    function loop(t) {
      Stream
        .find({
          'format': 'mjpg',
          'online': true
        })
        .exec(function (err, streams) {
          if (err) { console.log(err) }
          console.log(streams.length)
          communicator.broadcast('xcut', ((++switcher % 2 == 0) ? 1 : 2), streams[Math.round(Math.random() * (streams.length + 1))])
          console.log(t)
          // var tNew = chance.integer({min:5000,max:15000})
          var tNew = 10000

          // setTimeout(function() {
            communicator.broadcast('icut_pan', 2, {top: 30, left: 40, zoom: 2})
          // }, 1000)

          setTimeout(function() {loop(tNew)}, t)
        })
    }

    console.log('serf.club.engine'.bgBlack.bold)

    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongodbUri)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))

    db.once('open', function () {
      console.log('db open'.bgCyan)
      loop();
    })

  }
}

module.exports = director
