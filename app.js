// Modules
var editor = require('./modules/editor.js')
var communicator = require('./modules/communicator.js')
// var Raven = require('raven')
// Set up Sentry
// Raven.config(
//   'https://28cd2a82a59b41ce9241302972f5b8e1:3fdf16a1156d45dcab4ac4a8d2792f6c@sentry.io/147142'
// ).install()
// Start
communicator.init()
editor.start()
