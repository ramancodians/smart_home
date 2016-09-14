
SmartHome.sockets = (function() {
  // Create secure websocket at the current url.
  var socket = io.connect(window.location.href, {secure:true});

  var emit = function(topic, msg) {
    socket.emit(topic, msg);
  };

  var upload = function(topic, type) {
    return function(e){
      var file = e.target.files[0];
      if(file && file.type === type)
        socket.emit(topic, file);
    }
  };

  var on = function(topic, callback) {
    socket.on(topic, callback);
  }

  var off = function(topic) {
    socket.off(topic);
  }

  return {
    on: on,
    off: off,
    emit: emit,
    upload: upload
  }
})();
