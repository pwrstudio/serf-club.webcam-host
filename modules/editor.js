"use strict"
// Dependencies
const mongoose = require('mongoose')
const colors = require('colors')
const Chance = require('chance')
const chance = new Chance()

// Models
const Stream = require('../models/stream.js')

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

    // Connect to database...
    mongoose.Promise = global.Promise
    mongoose.connect(config.mongodbUri)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))

    // Once the database is open, start the loop
    db.once('open', function () {
      editor.loop(director.mainSpeed)
      composer.start()
      speaker.start()
    })

  },
  loop: function loop (time) {

    // Advance the director
    director.tick()

    // Get stream
    Stream
      .find({
        'format': 'mjpg',
        'online': true
      })
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

          // Get stream
          const selectedStream = streams[chance.integer({min: 0, max: streams.length - 1})]

          if (screenSelector === 1) {
            state.screenOne.url = selectedStream.url
            state.screenOne.classObject.active = true
            state.screenTwo.classObject.active = false
            state.screenTwo.classObject.direct = false
          } else {
            state.screenTwo.url = selectedStream.url
            state.screenTwo.classObject.active = true
            state.screenOne.classObject.active = false
            state.screenOne.classObject.direct= false
          }

          // Play new background sound
          composer.triggerDiagetic()

          // Broadcast new state
          communicator.crossCut()

          // One in six low-intensity jumpcut
          if(director.mainSpeed > 15000 && director.mainSpeed < 20000 && chance.weighted([true, false], [6, 1])) {

            var isFirst = true

            function jump() {

              let panClass = 'pan-' + chance.pickone(panSteps) + '-' + chance.pickone(panSteps)
              let zoomClass = ''
              if(isFirst) {
                zoomClass = 'zoom-' + chance.pickone(zoomSteps)
              }

              if (screenSelector === 1) {
                state.screenOne.classObject[panClass] = true
                if(isFirst) {
                  state.screenOne.classObject[zoomClass] = true
                }
              } else {
                state.screenTwo.classObject[panClass] = true
                if(isFirst) {
                  state.screenTwo.classObject[zoomClass] = true
                }
              }

              isFirst = false

              communicator.jumpCut()

            }

            setTimeout(jump, 2000)
            setTimeout(jump, 3000)
            setTimeout(jump, 5000)

          }

          setTimeout(function () { editor.loop(director.mainSpeed) }, time)

        }

      })
  }
}

module.exports = editor
