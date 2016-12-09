// let nlp = require('nlp_compromise')
let Sentencer = require('sentencer');
// let fs = require('fs')
// let markov = require('markov')
// let m = markov(1)
// let corpus = fs.createReadStream('./content/text.txt')

var nouns = [
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
var adjectives = [
  'cold',
  'warm',
  'good',
  'distant',
  'absent',
  'close',
  'closed',
  'far away',
  'great',
  'next',
  'different',
  'indifferent',
  'early',
  'shaken',
  'content',
  'trapped',
  'late',
  'valuable',
  'brilliant',
  'dark',
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
  'coming',
  'sad',
  'important',
  'right',
  'alright',
  'relieved',
  'impossible',
  'wrong',
  'bad',
  'good']
var verbs = [
  'will be',
  'has been',
  'is',
  'would be',
  'was',
  'seemed',
  'might be']
var actions = [
  'heard',
  'overheard',
  'saw',
  'felt',
  'visited',
  'revisited',
  'looked at',
  'stared at',
  'knew',
  'was aware of',
  'mentioned',
  'was close to',
  'travelled to',
  'found',
  'thought about',
  'dreamt about',
  'told about',
  'indicated']
var objects = [
  'them',
  'her',
  'him',
  'the location',
  'the area',
  'it',
  'something',
  'what happened',
  'the object',
  'the situation',
  'the process',
  'the story',
  'the screen',
  'the organization',
  'the group',
  'the building',
  'the company',
  'the club',
  'someone']
var singleObjects = [
  'story',
  'step',
  'mechanism',
  'process',
  'organization',
  'machine']
var statements = [
  'yes',
  'yes',
  'yes',
  'no',
  'no',
  'no',
  'maybe',
  'perhaps',
  'could be',
  'I have no idea',
  'I had no idea',
  'I don’t know',
  'no idea',
  'true',
  'false'
]
var questions = [
  'yes?',
  'no?',
  'really?',
  'why not?',
  'how?',
  'where?',
  'why?',
  'what?']
var punctations = [
  '',
  '',
  '',
  '...',
  '.']
var adverbs = [
  'quickly',
  'suddenly',
  'finally',
  'slowly',
  'technically',
  'carefully']
var sentenceTemplates = [
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

var speaker = {
  init: function init (){
    Sentencer.configure({
      nounList: nouns,
      adjectiveList: adjectives,
      actions: {
        verb: function(){
          return verbs[Math.round(Math.random() * (verbs.length - 1))]
        },
        action: function(){
          return actions[Math.round(Math.random() * (actions.length - 1))]
        },
        object: function(){
          return objects[Math.round(Math.random() * (objects.length - 1))]
        },
        statement: function(){
          return statements[Math.round(Math.random() * (statements.length - 1))]
        },
        question: function(){
          return questions[Math.round(Math.random() * (questions.length - 1))]
        },
        punctation: function(){
          return punctations[Math.round(Math.random() * (punctations.length - 1))]
        },
        adverb: function(){
          return adverbs[Math.round(Math.random() * (adverbs.length - 1))]
        },
        single_object: function(){
          return singleObjects[Math.round(Math.random() * (singleObjects.length - 1))]
        }
      }
    })
  },
  utter: function utter () {
    let utterance = Sentencer.make(sentenceTemplates[Math.round(Math.random() * (sentenceTemplates.length - 1))])
    return utterance
  }
}

module.exports = speaker
