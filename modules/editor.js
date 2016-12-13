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

    // Advance the director
    director.tick()

    const queryArgs = {
      'format': 'mjpg',
      'online': true
    }

    console.log(colors.bgYellow(director.mainSpeed))

    // if(director.intense) {
    //   queryArgs.intensity = { $gt: 7 }
    //   console.log('‡‡‡ Mode: intense'.bgYellow)
    // } else {
    //   queryArgs.intensity = { $lt: 8 }
    //   console.log('‡‡‡ Mode: calm'.bgYellow)
    // }

    if(director.exterior) {
      console.log('‡‡‡ Mode: Exterior'.bgYellow)
    } else {
      console.log('‡‡‡ Mode: Interior'.bgYellow)
    }

    // if(director.mainSpeed > 25000){
    //   queryArgs.iconic = true
    //   console.log('‡‡‡ Mode: Iconic'.bgYellow)
    // }

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

          let randomIndex = Math.round(Math.random() * (streams.length - 1))

          // console.log('random index:',randomIndex)

          const selectedStream = streams[randomIndex]

          // console.dir(selectedStream)

          console.log(selectedStream.description, selectedStream.location,'iconic:', selectedStream.iconic)

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

          // state.subtitle = ''

          // Broadcast new state
          communicator.crossCut()

          // One in six low-intensity jumpcut
          // if(chance.weighted([true, false], [1, 6]) && director.mainSpeed > 15000) {
          if(director.mainSpeed > 14000 && director.mainSpeed < 24000) {

            var isFirst = true

            function jump() {

              console.log('JUMPCUT'.bgYellow)

              // Reset classes
              // if (screenSelector === 1) {
              //   Object.keys(state.screenOne.classObject).forEach(function(key,index) {
              //     state.screenOne.classObject[key] = false
              //   })
              //   state.screenOne.classObject.active = true
              // } else {
              //   Object.keys(state.screenTwo.classObject).forEach(function(key,index) {
              //     state.screenTwo.classObject[key] = false
              //   })
              //   state.screenTwo.classObject.active = true
              // }

              let panClass = 'pan-' + chance.pickone(panSteps) + '-' + chance.pickone(panSteps)
              let zoomClass = ''
              if(isFirst) {
                console.log('first')
                zoomClass = 'zoom-' + chance.pickone(zoomSteps)
              }

              console.log(panClass)
              console.log(zoomClass)

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

            setTimeout(jump, 7000)
            if(chance.bool()) {setTimeout(jump, 10000)}
            setTimeout(jump, 14000)

          }

          setTimeout(function () { editor.loop(director.mainSpeed) }, time)

        }

      })
  }
}

module.exports = editor
