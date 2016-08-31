
var net = require('net');
var mongoose = require('mongoose');
var fs = require('fs');
var notification = require('./notification');
var aedes = require('aedes');
var websocket = require('websocket-stream');

exports.listen = function() {
  aedes = aedes({
    concurrency: 1000
  });
  aedes.authorizePublish = authorizePublish;
  var server = net.createServer(aedes.handle);
  server.listen(1883);
  websocket.createServer({port: 8080}, aedes.handle);
}

var authorizePublish = function (client, packet, callback) {
  callback(null);
}
