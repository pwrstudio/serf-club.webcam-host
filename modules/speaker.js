let nlp = require('nlp_compromise')
let fs = require('fs')
let markov = require('markov')
let m = markov(1)
let corpus = fs.createReadStream('./content/text.txt');


var speaker = {
  init: function init (){
    m.seed(corpus)
  },
  utter: function utter () {
    let utterance = m.fill(m.pick(), 10).join(' ')
    // return nlp.sentence(utterance).to_past().text()
    return utterance
  }
}

module.exports = speaker
