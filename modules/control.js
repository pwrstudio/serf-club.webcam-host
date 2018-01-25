// Dependencies
const colors = require('colors')
const Chance = require('chance')
const chance = new Chance()

// Modules
const state = require('./state.js')
const audio = require('./audio.js')
const video = require('./video.js')
const text = require('./text.js')
const communicator = require('./communicator.js')

// const panSteps = [0, 20, 40, 60, 80, 100]
// const zoomSteps = [20, 30, 40]

const control = {
  activeScreen: {
    one: true,
    two: false
  },
  init() {
    console.log('SERF CLUB ENGINE'.cyan)

    console.log('Initializing content generators...'.yellow)
    const videoPromise = video.init()
    const audioPromise = audio.init()
    const textPromise = text.init()

    Promise.all([videoPromise, audioPromise, textPromise])
      .then(status => {
        status.map(m => console.log('–'.green, m.green))
        console.log('✓ All generators initialized'.green)
        this.start()
      })
      .catch(err => {
        console.log('Init failed ', err)
      })
  },
  start() {
    console.log('Starting engine...'.yellow)
    this.stepVideo(10000)
    this.stepText(9000)
    this.stepNoise(5000)
    // this.stepHarmony()
  },
  stepVideo(time) {
    console.log('Video Step'.cyan, String(time / 1000).yellow)

    const randomStreamPromise = video.getRandomStream({
      // format: 'mjpg',
      online: true
    })

    randomStreamPromise.then(stream => {
      // Switch screens
      this.activeScreen.one = !this.activeScreen.one
      this.activeScreen.two = !this.activeScreen.two

      // Set state depending on active screen
      if (this.activeScreen.one) {
        state.video.one.stream = stream
        state.video.one.classObject.active = true
        state.video.two.classObject.active = false
        state.video.two.classObject.direct = false
        console.log(state.video.one.stream)
      } else {
        state.video.two.stream = stream
        state.video.two.classObject.active = true
        state.video.one.classObject.active = false
        state.video.one.classObject.direct = false
        console.log(state.video.two.stream)
      }

      // Broadcast cut
      communicator.crossCut()

      // ***********
      // Sine   wave
      // Max:   30s
      // Min:   10s
      // ***********
      const increase = Math.PI * 2 / 100
      setTimeout(() => {
        this.stepVideo(Math.floor((Math.sin(time) / 2 + 0.5) * 20000 + 10000))
      }, time)
    })
  },
  stepText(time) {
    console.log('Text Step'.cyan, String(time / 1000).yellow)

    state.text.subtitle = text.getLine(chance.pickone(['A', 'B', 'C', 'N']))

    // Broadcast subtitle
    communicator.subtitle()

    // ***********
    // Sine   wave
    // Max:   27s
    // Min:   7s
    // ***********
    const increase = Math.PI * 2 / 100
    setTimeout(() => {
      this.stepText(Math.floor((Math.sin(time) / 2 + 0.5) * 20000 + 7000))
    }, time)
  },
  stepNoise(time) {
    console.log('Noise Step'.cyan, String(time / 1000).yellow)

    const noisePromise = audio.getNoise()

    noisePromise.then(noise => {
      console.log(noise)
      state.audio.two = noise
      communicator.audioTwo()
    })

    // ***********
    // Sine   wave
    // Max:   80s
    // Min:   20s
    // ***********
    const increase = Math.PI * 2 / 100
    setTimeout(() => {
      this.stepNoise(Math.floor((Math.sin(time) / 2 + 0.5) * 60000 + 20000))
    }, time)
  }
}

module.exports = control
