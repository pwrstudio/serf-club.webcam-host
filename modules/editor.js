// Dependencies
const mongoose = require('mongoose')
const colors = require('colors')
const Chance = require('chance')
const chance = new Chance()
// Models
const Stream = require('../models/stream.js')
// const Audio = require('../models/audio.js')

// Config
const config = require('../config/config.js')
// Modules
const state = require('./state.js')
const director = require('./director.js')
const composer = require('./composer.js')
const communicator = require('./communicator.js')
const speaker = require('./speaker.js')

const panSteps = [0, 20, 40, 60, 80, 100]
let switcher = 0


const editor = {
  start: function start () {

    console.log('serf.club.engine'.bgBlack.bold)

    // Connect to database...
    mongoose.Promise = global.Promise
    mongoose.connect(config.mongodbUri)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))

    // Once the databse is open, start the loop
    db.once('open', function () {
      console.log('db open'.bgGreen)
      editor.loop(director.mainSpeed)
      composer.start()
    })

  },
  loop: function loop(time) {

    const queryArgs = {
      'format': 'mjpg',
      'online': true
    }

    Stream
      .find(queryArgs)
      .exec(function (err, streams) {

        // Handle error
        if (err) { console.log(err) }

        // For reference...
        console.log(streams.length)

        const selectedStream = chance.pickone(streams);

        // console.log(selectedStream.intimacy)
        // console.log(selectedStream.url)

        // Alternate between screen one and screen two
        if (switcher % 2 === 0) {
          state.screenOne.url = selectedStream.url
          state.screenOne.classObject.active = true
          state.screenTwo.classObject.active = false
        } else {
          state.screenTwo.url = selectedStream.url
          state.screenTwo.classObject.active = true
          state.screenOne.classObject.active = false
        }

        // Broadcast new state
        communicator.crossCut()

        // Set subtitle
        if(selectedStream.intimacy > 7) {
          speaker.conversation()
        }

        // Increment switcher
        switcher++

        // Advance the director
        director.tick();

        setTimeout(function () { editor.loop(director.mainSpeed) }, time)

      })
  }
}

module.exports = editor
