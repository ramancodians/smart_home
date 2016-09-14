
var fs = require('fs');
var sio = require('socket.io');
var util = require('./util.js');
var mongoose = require('mongoose');

var handlers = util.readFileNames('lib/event_handlers', false);
var Module = mongoose.model("Module");

exports.emitModules = function(socket) {
  Module.find(function(err, modules) {
    for(var i = 0; i < modules.length; i++) {
      modules[i] = modules[i].toObject();
      delete modules[i].__v;
    };

    // Emit to socket, if provided, otherwise emit to all.
    if(socket) socket.emit('modules', modules);
    else sio.sockets.emit('modules', modules);
  });
}

exports.listen = function(server) {
  sio = sio.listen(server);
  sio.on('connection', function(socket) {
    for (var i = 0; i < handlers.length; i++)
      require('./event_handlers/' + handlers[i])({
        socket: socket,
        emitModules: exports.emitModules,
        Module: Module
      });
  });
}

exports.emitToAll = function(topic, payload) {
  sio.sockets.emit(topic, payload);
}
