// Dependencies
// const mongoose = require('mongoose')
const Prismic = require('prismic.io')
const Chance = require('chance')
const chance = new Chance()

// Models
const Audio = require('../models/audio.js')
const config = require('./config.js')

module.exports = {
  db: {},
  content: [],
  init() {
    return new Promise((resolve, reject) => {
      // Recursive function to get all pages of posts
      fetchPosts = pg => {
        Prismic.api('https://serclub.prismic.io/api/v2')
          .then(api => {
            return api.query('', {page: pg, pageSize: 100})
          })
          .then(
            response => {
              console.log('response.page', response.page)
              console.log('response.total_pages', response.total_pages)
              if (response.page < response.total_pages) {
                this.content = this.content.concat(response.results)
                fetchPosts(++pg)
              } else {
                this.content = this.content.concat(response.results)
                console.log('✓ Received content:', String(this.content.length))
                resolve('Audio initialized')
              }
            },
            err => {
              reject(err)
            }
          )
      }
      fetchPosts(1)
    })
  },
  getNoise() {
    return new Promise((resolve, reject) => {
      // const audioPromise = pickone(this.content({})
      // audioPromise.then(audio => {
      // console.log('audio lenght', audio.length)
      resolve(chance.pickone(this.content))
      // })
      // audioPromise.catch(err => {
      // reject(err)
      // })
    })
  }
}
