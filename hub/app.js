
var mongoose = require('mongoose');
var fs = require('fs');
var util = require('./lib/util.js');

// Load mongoose schemas.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/smart_home');
var models = util.readFileNames('lib/schemas', true);
for (var i = 0; i < models.length; i++)
  require('./' + models[i])();

require('./lib/mqtt').listen();
