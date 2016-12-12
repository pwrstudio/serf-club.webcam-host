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
const zoomSteps = [20, 30, 40]
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
      speaker.start()
    })
  },
  loop: function loop (time) {

    const queryArgs = {
      'format': 'mjpg',
      'online': true
    }

    if(director.mainSpeed > 38000){
      queryArgs.iconic = true
    }

    console.log(queryArgs)

    Stream
      .find(queryArgs)
      .exec(function (err, streams) {
        // Handle error
        if (err) { console.log(err) }

        if(streams.length !== 0) {

          let screenSelector = 0

          // Alternate between screens
          if (switcher % 2 === 0) {
            screenSelector = 1
          } else {
            screenSelector = 2
          }

          // Increment switcher
          switcher++

          // Reset classes
          if (screenSelector === 1) {
            Object.keys(state.screenOne.classObject).forEach(function(key,index) {
              state.screenOne.classObject[key] = false
            })
          } else {
            Object.keys(state.screenTwo.classObject).forEach(function(key,index) {
              state.screenTwo.classObject[key] = false
            })
          }

          // For reference...
          console.log(streams.length)

          const selectedStream = chance.pickone(streams)

          console.log(selectedStream.description)
          console.log(selectedStream.iconic)

          if (screenSelector === 1) {
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

          // Jumpcut
          setTimeout(function(){

            let panClass = 'pan-' + chance.pickone(panSteps) + '-' + chance.pickone(panSteps)
            let zoomClass = 'zoom-' + chance.pickone(zoomSteps)

            console.log(panClass)
            console.log(zoomClass)

            if (screenSelector === 1) {
              state.screenTwo.classObject[panClass] = true
              state.screenOne.classObject[panClass] = true
            } else {
              state.screenTwo.classObject[zoomClass] = true
              state.screenOne.classObject[zoomClass] = true
            }

            communicator.jumpCut()

          }, (director.mainSpeed / 2))

          // Advance the director
          director.tick()

          setTimeout(function () { editor.loop(director.mainSpeed) }, time)

        }

      })
  }
}

module.exports = editor