// Modules
var editor = require('./modules/editor.js')
var communicator = require('./modules/communicator.js')
var speaker = require('./modules/speaker.js')

// Start
communicator.init()
speaker.init()
editor.start()
