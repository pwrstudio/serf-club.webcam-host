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
var speaker = require('./speaker.js')
var switcher = 0;
var panSteps = [0, 20, 40, 60, 80, 100]


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

          if(switcher % 2 === 0) {
            state.screenOne.url = chance.pickone(streams).url
            state.screenOne.classObject.active = true
            state.screenTwo.classObject.active = false
            state.subtitle = speaker.utter()
          } else {
            state.screenTwo.url = chance.pickone(streams).url
            state.screenTwo.classObject.active = true
            state.screenOne.classObject.active = false
            state.subtitle = speaker.utter()
          }

          console.log(state.subtitle)

          switcher++

          communicator.updateState()

          // var tNew = chance.integer({min:5000,max:15000})

          var tNew = 10000

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
