// Dependencies
const mongoose = require('mongoose')
const Chance = require('chance')
const chance = new Chance()
const PoissonProcess = require('poisson-process')

// Models
const Audio = require('../models/audio.js')

// Modules
const state = require('./state.js')
const director = require('./director.js')
const communicator = require('./communicator.js')

const composer = {
  start: function start() {
    const composerLoop = PoissonProcess.create(director.audioSpeed, function message() {
      const queryArgs = {}

      // 0.5 change of melodic sounds
      // if (chance.bool()) {
      //   queryArgs.melodic = true
      // }

      console.log(queryArgs)

      Audio.find(queryArgs).exec(function(err, audioStreams) {
        if (err) {
          console.log(err)
        }

        console.log('main', audioStreams)

        if (audioStreams.length > 0) {
          // Get Random audio
          state.soundTwo = chance.pickone(audioStreams)

          // Set random playback rate
          state.playerTwoRate = chance.weighted([1.4, 1.2, 1, 0.8, 0.6, 0.4], [2, 4, 10, 4, 2, 1])

          // Send audio
          communicator.audioTwo()
        }
      })
    })

    composerLoop.start()
  },
  triggerDiagetic: function triggerDiagetic() {
    // Get diegetic sound
    Audio.find({diegetic: true}).exec(function(err, audioStreams) {
      if (audioStreams.length) {
        // Handle error
        if (err) {
          console.log(err)
        }

        console.log('diagetic', audioStreams)

        // Get Random audio
        state.soundOne = chance.pickone(audioStreams)

        // Set random playback rate
        state.playerOneRate = chance.weighted([1.4, 1.2, 1, 0.8, 0.6, 0.4], [2, 4, 10, 4, 2, 1])

        // Send audio
        communicator.audioOne()
      }
    })
  }
}

module.exports = composer
