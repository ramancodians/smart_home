
var net = require('net');
var mongoose = require('mongoose');
var io = require('./sockets');
var fs = require('fs');
var notification = require('./notification');
var aedes = require('aedes');

var Module = mongoose.model("Module");

/*
 * Relay module (mqtt) messages to web users who
 * have registered through socket.io.
 */
var relayModuleTopics = function(module) {
  module.outgoing_topics.forEach(function(topic) {
    topic = topic + module._id;
    aedes.subscribe(topic, function(packet, callback) {
        io.emitToAll(topic, packet.payload);
        callback();
      }, function() {});
  });
}

exports.listen = function(opts, port) {
  aedes = aedes(opts);

  aedes.subscribe('registration', function(packet, callback) {
    var payload = JSON.parse(packet.payload);
    var module = new Module({ _id: new mongoose.Types.ObjectId(payload.id),
                              title: payload.title, outgoing_topics: payload.outgoing,
                              incoming_topics: payload.incoming
                            });
    module.save(function(err) {
      if(!err) {
        relayModuleTopics(module);
        io.emitModules();
      }
      callback();
    });
  }, function() {});

  Module.find(function(err, modules) {
    for(var i = 0; i < modules.length; i++)
      relayModuleTopics(modules[i]);
  });

  aedes.authorizePublish = authorizePublish;

  var server = net.createServer(aedes.handle);
  server.listen(port);
}

exports.retained = function(topic) {
  return aedes.persistence.createRetainedStream(topic);
}

exports.publish = function(topic, payload, retain, done) {
  var packet  = {
    cmd: 'publish',
    retain: retain,
    qos: 0,
    dup: false,
    topic: topic,
    payload: payload
  }
  aedes.publish(packet, done);
}

var processHookEvents = function(events) {
  var e;
  for(var i = 0; i < events.length; i++) {
    e = events[i];
    /*
     * The delay works by calling this function recursively
     * with the remaining events to be processed, after the
     * specified number of milliseconds have passed via
     * a timeout.
     */
    if(e.topic === 'millis') {
      setTimeout(function() {
        processHookEvents(events.slice(i+1, events.length));
      }, parseInt(e.payload));
      return;
    }
    /*
     * Expected format for notifications is phone number or
     * email address, separator character ('>'), and
     * then message.
     */
    else if(e.topic === 'phone' || e.topic === 'email') {
      var sepIndex = e.payload.indexOf('>');
      notification[e.topic](e.payload.substring(0, sepIndex),
        e.payload.substring(sepIndex + 1, e.payload.length));
    }
    else
      exports.publish(e.topic, e.payload, function(){});
  }
}

// All mqtt messages (published by clients) initially pass through this function.
var authorizePublish = function (client, packet, callback) {

  // Process hooks for the client publishing this message.
  Module.findById(client.id, function (err, doc) {
    if(!err && doc) {
      var payload = packet.payload.toString();

      var hooks = doc.hooks.filter(function(hook) {
        return hook.topic === packet.topic.replace(client.id, "");
      });

      for	(var i = 0; i < hooks.length; i++) {
        switch(hooks[i].cond) {
          case '<':
            if(parseFloat(payload) < parseFloat(hooks[i].target))
              processHookEvents(hooks[i].events);
            break;
          case '>':
            if(parseFloat(payload) > parseFloat(hooks[i].target))
              processHookEvents(hooks[i].events);
            break;
          case '=':
            if(payload === hooks[i].target)
              processHookEvents(hooks[i].events);
            break;
        }
      }
    }
  });
  callback(null);
}
