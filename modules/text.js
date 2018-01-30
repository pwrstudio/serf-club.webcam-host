const Chance = require('chance')
const chance = new Chance()
const CharacterA = require('sentencer')
const CharacterB = require('sentencer')
const CharacterC = require('sentencer')
const Narrator = require('sentencer')

const vocabulary = require('./vocabulary.js')

module.exports = {
  CharacterA: {},
  CharacterB: {},
  CharacterC: {},
  Narrator: {},
  init() {
    return new Promise((resolve, reject) => {
      CharacterA.configure({
        nounList: vocabulary.a.nouns,
        adjectiveList: vocabulary.a.adjectives,
        actions: {
          verb() {
            return chance.pickone(vocabulary.a.verbs)
          },
          action() {
            return chance.pickone(vocabulary.a.actions)
          },
          object() {
            return chance.pickone(vocabulary.a.objects)
          },
          statement() {
            return chance.pickone(vocabulary.a.statements)
          },
          question() {
            return chance.pickone(vocabulary.a.questions)
          },
          punctation() {
            return chance.pickone(vocabulary.a.punctations)
          },
          adverb() {
            return chance.pickone(vocabulary.a.adverbs)
          },
          future() {
            return chance.pickone(vocabulary.a.futures)
          },
          present() {
            return chance.pickone(vocabulary.a.presents)
          }
        }
      })

      CharacterB.configure({
        nounList: vocabulary.b.nouns,
        adjectiveList: vocabulary.b.adjectives,
        actions: {
          verb() {
            return chance.pickone(vocabulary.b.verbs)
          },
          action() {
            return chance.pickone(vocabulary.b.actions)
          },
          object() {
            return chance.pickone(vocabulary.b.objects)
          },
          statement() {
            return chance.pickone(vocabulary.b.statements)
          },
          question() {
            return chance.pickone(vocabulary.b.questions)
          },
          punctation() {
            return chance.pickone(vocabulary.b.punctations)
          },
          adverb() {
            return chance.pickone(vocabulary.b.adverbs)
          },
          future() {
            return chance.pickone(vocabulary.b.futures)
          },
          present() {
            return chance.pickone(vocabulary.b.presents)
          }
        }
      })

      // CharacterC.configure({
      //   nounList: vocabulary.c.nouns,
      //   adjectiveList: vocabulary.c.adjectives,
      //   actions: {
      //     verb() {
      //       return chance.pickone(vocabulary.c.verbs)
      //     },
      //     action() {
      //       return chance.pickone(vocabulary.c.actions)
      //     },
      //     object() {
      //       return chance.pickone(vocabulary.c.objects)
      //     },
      //     statement() {
      //       return chance.pickone(vocabulary.c.statements)
      //     },
      //     question() {
      //       return chance.pickone(vocabulary.c.questions)
      //     },
      //     punctation() {
      //       return chance.pickone(vocabulary.c.punctations)
      //     },
      //     adverb() {
      //       return chance.pickone(vocabulary.c.adverbs)
      //     },
      //     future() {
      //       return chance.pickone(vocabulary.c.futures)
      //     },
      //     present() {
      //       return chance.pickone(vocabulary.c.presents)
      //     }
      //   }
      // })

      Narrator.configure({
        nounList: vocabulary.narrator.nouns,
        adjectiveList: vocabulary.narrator.adjectives,
        actions: {
          verb() {
            return chance.pickone(vocabulary.narrator.verbs)
          },
          action() {
            return chance.pickone(vocabulary.narrator.actions)
          },
          object() {
            return chance.pickone(vocabulary.narrator.objects)
          },
          statement() {
            return chance.pickone(vocabulary.narrator.statements)
          },
          question() {
            return chance.pickone(vocabulary.narrator.questions)
          },
          punctation() {
            return chance.pickone(vocabulary.narrator.punctations)
          },
          adverb() {
            return chance.pickone(vocabulary.narrator.adverbs)
          },
          future() {
            return chance.pickone(vocabulary.narrator.futures)
          },
          present() {
            return chance.pickone(vocabulary.narrator.presents)
          }
        }
      })

      resolve('Text generator initialized')
    })
  },
  getLine(character) {
    let line = ''
    switch (character) {
      case 'A':
        line = CharacterA.make(chance.pickone(vocabulary.a.sentenceTemplates))
        break
      case 'B':
        line = CharacterA.make(chance.pickone(vocabulary.a.sentenceTemplates))
        break
      // case 'C':
      //   line = 'C: ' + CharacterA.make(chance.pickone(vocabulary.a.sentenceTemplates))
      //   break
      case 'N':
        line = Narrator.make(chance.pickone(vocabulary.a.sentenceTemplates)).toUpperCase()
        break
      default:
        line = Narrator.make(chance.pickone(vocabulary.a.sentenceTemplates)).toUpperCase()
    }
    return line
  }
}
