
var mqtt = require('./../mqtt');

module.exports = function(app) {
  app.socket.on('mqttPublish', function(data) {
    mqtt.publish(data.topic, data.payload.toString(), false, function(){});
  });

  app.socket.on('mqttRetain', function(data) {
    var retainedStream = mqtt.retained(data.topic);
    retainedStream.on('data', function(content) {
      if(content) app.socket.emit(data.topic, content.payload);
    });
  });
};
