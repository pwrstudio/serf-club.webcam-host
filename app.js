// Modules
var director = require('./modules/director.js')
var communicator = require('./modules/communicator.js')
var speaker = require('./modules/speaker.js')

// Start
communicator.init()
speaker.init()
director.start()
