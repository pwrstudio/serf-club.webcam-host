const Chance = require('chance')
const chance = new Chance()
const Sentencer = require('sentencer')
const PoissonProcess = require('poisson-process')

const state = require('./state.js')
const director = require('./director.js')
const communicator = require('./communicator.js')

const nouns = [
  'he',
  'she',
  'it',
  'the guest',
  'the man',
  'nobody',
  'everyone',
  'the woman',
  'the girl',
  'the boy',
  'the child']
const adjectives = [
  'cold',
  'warm',
  'good',
  'distant',
  'absent',
  'close',
  'closed',
  'far away',
  'next',
  'different',
  'indifferent',
  'early',
  'shaken',
  'content',
  'trapped',
  'angry',
  'nervous',
  'late',
  'valuable',
  'brilliant',
  'tired',
  'blocked',
  'new',
  'safe',
  'crazy',
  'hurt',
  'old',
  'uneasy',
  'happy',
  'leaving',
  'deep',
  'sad',
  'narrow',
  'wide',
  'important',
  'right',
  'alright',
  'relieved',
  'impossible',
  'wrong',
  'bad',
  'good']
const verbs = [
  'will be',
  'has been',
  'is',
  'is not',
  'would be',
  'was',
  'was not',
  'seemed',
  'might be']
const actions = [
  'heard',
  'overheard',
  'saw',
  'visited',
  'focused',
  'revisited',
  'looked at',
  'stared at',
  'knew',
  'need',
  'was aware of',
  'mentioned',
  'longed for',
  'travelled to',
  'found',
  'struggled with',
  'touched',
  'thought about',
  'dreamt about',
  'told about',
  'wanted',
  'indicated']
const objects = [
  'them',
  'her',
  'him',
  'the location',
  'the area',
  'it',
  'something',
  'what happened',
  'the object',
  'the thing',
  'the individual',
  'the situation',
  'the process',
  'the story',
  'the screen',
  'the organization',
  'the group',
  'the building',
  'the company',
  'the club',
  'the assembly',
  'the position',
  'someone']
const singleObjects = [
  'story',
  'step',
  'mechanism',
  'device',
  'vehicle',
  'engine',
  'rule',
  'process',
  'organization',
  'machine']
const statements = [
  'yes',
  'yes',
  'yes',
  'no',
  'no',
  'no',
  'maybe',
  'perhaps',
  'could be',
  'I know',
  'I have no idea',
  'I had no idea',
  'I don’t know',
  'no idea',
  'true',
  'false',
  'sure'
]
const questions = [
  'yes?',
  'no?',
  'really?',
  'why not?',
  'how?',
  'where?',
  'why?',
  'what?']
const punctations = [
  '',
  '',
  '',
  '...',
  '.']
const adverbs = [
  'quickly',
  'suddenly',
  'finally',
  'always',
  'never',
  'rarely',
  'poorly',
  'really',
  'slowly',
  'technically',
  'carefully']
const sentenceTemplates = [
  '{{ statement}}, {{ noun }} {{ verb }} {{ adjective }}',
  '{{ statement}}... {{ noun }} {{ verb }} {{ adjective }}',
  '{{ noun }} {{ verb }} {{ adjective }}{{ punctation }}',
  '{{ noun }} {{ verb }} {{ adjective }}{{ punctation }}',
  '{{ noun }} {{ action }} {{ object }}{{ punctation }}',
  'I {{ action }} {{ object }}{{ punctation }}',
  'a {{ adjective}} {{ single_object }}{{ punctation }}',
  'I am {{ adjective }}{{ punctation }}',
  'I was {{ adjective }}{{ punctation }}',
  '{{ noun }} {{ adverb }} {{ action }} {{ object }}',
  '{{ statement }}{{ punctation }}',
  '{{ question }}',
  '{{ question }} {{ noun }} {{ action }} {{ object }}?']

const speaker = {
  start: function start () {
    Sentencer.configure({
      nounList: nouns,
      adjectiveList: adjectives,
      actions: {
        verb: function () {
          return verbs[Math.round(Math.random() * (verbs.length - 1))]
        },
        action: function () {
          return actions[Math.round(Math.random() * (actions.length - 1))]
        },
        object: function () {
          return objects[Math.round(Math.random() * (objects.length - 1))]
        },
        statement: function () {
          return statements[Math.round(Math.random() * (statements.length - 1))]
        },
        question: function () {
          return questions[Math.round(Math.random() * (questions.length - 1))]
        },
        punctation: function () {
          return punctations[Math.round(Math.random() * (punctations.length - 1))]
        },
        adverb: function () {
          return adverbs[Math.round(Math.random() * (adverbs.length - 1))]
        },
        single_object: function () {
          return singleObjects[Math.round(Math.random() * (singleObjects.length - 1))]
        }
      }
    })

    const speakerLoop = PoissonProcess.create(director.speakerSpeed, function message() {
      let utterance = Sentencer.make(sentenceTemplates[Math.round(Math.random() * (sentenceTemplates.length - 1))])
      state.subtitle = utterance
      communicator.subtitle()
    })

    speakerLoop.start()

  }
}

module.exports = speaker
