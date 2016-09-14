
var babel = require("babel-core");
var compressor = require('node-minify');
var util = require('./util.js');
var fs = require('fs');

module.exports = function() {
  var fileNames =  util.readFileNames('client', true);

  // Transpile javascript from es6 to es5.
  for(var i = 0; i < fileNames.length; i++) {
    var transpilled = babel.transformFileSync(fileNames[i], {}).code;
    fs.writeFileSync(fileNames[i], transpilled); // Destructive.
  }

  // Minify transpiled javascript.
  new compressor.minify({
    type: 'gcc',
    fileIn: fileNames,
    fileOut: 'public/js/global-min-gcc.js',
    sync: true,
    callback: function(err, min) {}
  });
}
