
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var fs = require('fs');
var https = require('https');
var util = require('./lib/util.js');
require('./lib/minify')();

// Load all mongoose schemas.
mongoose.connect('mongodb://localhost/smart_home');
var models = util.readFileNames('lib/schemas', true);
for (var i = 0; i < models.length; i++)
  require('./' + models[i])();

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var options = {
    key:    fs.readFileSync('ssl/server-key.pem'),
    cert:   fs.readFileSync('ssl/server-crt.pem'),
    ca:     fs.readFileSync('ssl/ca-crt.pem'),
    crl:    fs.readFileSync('ssl/ca-crl.pem'),
    requestCert:        true,
    rejectUnauthorized: true
};

var httpserver = https.createServer(options, app).listen(1337, '0.0.0.0');
require('./lib/sockets').listen(httpserver);
require('./lib/mqtt').listen({}, 1883);
