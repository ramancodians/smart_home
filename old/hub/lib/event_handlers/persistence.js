
var modifyModule = function(app, id, modification) {
  app.Module.findById(id, function (err, doc) {
    if(!doc) return;
    if(modification(doc)) {
      doc.save(function(err) {
        app.emitModules();
      });
    }
  });
}

module.exports = function(app) {
  app.socket.on('placeModule', function(data) {
    modifyModule(app, data._id, function(doc) {
      if(doc.components.indexOf(data.component) != -1)
        return false;
      doc.components.push(data.component);
      return true;
    });
  });

  app.socket.on('removeModule', function(data) {
    modifyModule(app, data._id, function(doc) {
      var index = doc.components.indexOf(data.component);
      if(index == -1)
        return false;
      doc.components.splice(index, 1);
      return true;
    });
  });

  app.socket.on('addHook', function(data) {
    app.Module.findById(data._id, function (err, doc) {
      if(!doc) return;
      delete data._id;
      doc.hooks.push(data);
      doc.save(function(err) {
        app.emitModules();
      });
    });
  });

  app.socket.on('removeHook', function(data) {
    app.Module.findById(data._id, function (err, doc) {
      if(!doc) return;
      if (data.index > -1) {
        doc.hooks.splice(data.index, 1);
        doc.save(function(err) {
          app.emitModules();
        });
      }
    });
  });

  app.socket.on('layout', function(data){
    fs.writeFile(__dirname + '/../public/img/layout.svg', data, function(err) {});
  });

  app.emitModules(app.socket);
}
