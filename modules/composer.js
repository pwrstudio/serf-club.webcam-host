// Dependencies
const mongoose = require('mongoose')
const Chance = require('chance')
const colors = require('colors')
const chance = new Chance()
const PoissonProcess = require('poisson-process')

// Models
const Audio = require('../models/audio.js')

// Modules
const state = require('./state.js')
const director = require('./director.js')
const communicator = require('./communicator.js')


const composer = {
  start: function start () {

    const composerLoop = PoissonProcess.create(director.audioSpeed, function message() {

      // console.log('audio triggered'.bgBlue)

      const queryArgs = {}

      if(chance.bool()) {
        queryArgs.melodic = true
      }

      Audio
      .find(queryArgs)
      .exec(function (err, audioStreams) {

        console.log('audio streams:', audioStreams.length)

        // Handle error
        if (err) { console.log(err) }

        const selectedAudio = chance.pickone(audioStreams)

        // console.log('extra sound:', selectedAudio.url)
        state.soundTwo = selectedAudio
        state.playerTwoRate  = chance.weighted([1.4, 1.2 , 1 , 0.8, 0.6, 0.4], [ 2, 4, 10 , 4, 2, 1])

        communicator.audioTwo()

      })

    })

    composerLoop.start()

  },
  triggerDiagetic: function triggerDiagetic() {

    console.log('diagetic'.bgBlue)

    const queryArgs = {'diegetic': true}

    Audio
    .find(queryArgs)
    .exec(function (err, audioStreams) {

      console.log('diagetic streams:', audioStreams.length)

      if(audioStreams.length !== 0) {

          // Handle error
        if (err) { console.log(err) }

        const selectedAudio = chance.pickone(audioStreams)

        // console.dir(selectedAudio)

        console.log('diagetic sound:', selectedAudio.url)
        state.soundOne = selectedAudio
        state.playerOneRate  = chance.weighted([1.4, 1.2 , 1 , 0.8, 0.6, 0.4], [ 2, 4, 10 , 4, 2, 1])

        communicator.audioOne()

      }

    })

  }
}

module.exports = composer
