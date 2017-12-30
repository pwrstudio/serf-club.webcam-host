'use strict'
const Chance = require('chance')
const chance = new Chance()
const Sentencer = require('sentencer')
const PoissonProcess = require('poisson-process')

const state = require('./state.js')
const director = require('./director.js')
const communicator = require('./communicator.js')
const vocabulary = require('./vocabulary.js')

const speaker = {
  start: function start() {
    Sentencer.configure({
      nounList: vocabulary.nouns,
      adjectiveList: vocabulary.adjectives,
      actions: {
        verb: function() {
          return vocabulary.verbs[Math.round(Math.random() * (vocabulary.verbs.length - 1))]
        },
        action: function() {
          return vocabulary.actions[Math.round(Math.random() * (vocabulary.actions.length - 1))]
        },
        object: function() {
          return vocabulary.objects[Math.round(Math.random() * (vocabulary.objects.length - 1))]
        },
        statement: function() {
          return vocabulary.statements[
            Math.round(Math.random() * (vocabulary.statements.length - 1))
          ]
        },
        question: function() {
          return vocabulary.questions[Math.round(Math.random() * (vocabulary.questions.length - 1))]
        },
        punctation: function() {
          return vocabulary.punctations[
            Math.round(Math.random() * (vocabulary.punctations.length - 1))
          ]
        },
        adverb: function() {
          return vocabulary.adverbs[Math.round(Math.random() * (vocabulary.adverbs.length - 1))]
        },
        single_object: function() {
          return vocabulary.singleObjects[
            Math.round(Math.random() * (vocabulary.singleObjects.length - 1))
          ]
        },
        future: function() {
          return vocabulary.futures[Math.round(Math.random() * (vocabulary.futures.length - 1))]
        },
        present: function() {
          return vocabulary.presents[Math.round(Math.random() * (vocabulary.presents.length - 1))]
        }
      }
    })
    const speakerLoop = PoissonProcess.create(director.speakerSpeed, function message() {
      let utterance = Sentencer.make(
        vocabulary.sentenceTemplates[
          Math.round(Math.random() * (vocabulary.sentenceTemplates.length - 1))
        ]
      )
      state.subtitle = utterance
      communicator.subtitle()
    })

    speakerLoop.start()
  }
}

module.exports = speaker
