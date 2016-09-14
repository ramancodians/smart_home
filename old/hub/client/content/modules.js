
SmartHome.modules = (function() {
  var modules = {};
  var modulesDialog;

  // Highlight all module's rows that contain the specified component.
  var highlightModuleRows = function(component) {
    modulesDialog.$.find('tr').each(function() {
      var row = $(this);
      var module = modules[row.find('td:first-child').text()];
      if(module && module.components.indexOf(component) != -1)
        row.css({color: "#00d19d"});
      else
        row.css({color: "#ffffff"});
    });
  };

  var getRowClassById = function(id) {
    var rows = modulesDialog.$.find('tr');
    for(var i = 0; i < rows.length; i++) {
      var row = $(rows[i]);
      if(id === row.find('td:first-child').text())
        return row.attr('class');
    }
    return '';
  };

  var show = function() {
    modulesDialog.show();
  };

  var loadModules = function(data) {
    if(data.length > 0) {
      var moduleHtml = '<tr>';

      // Build table headers from first module.
      for(var prop in data[0])
        if(prop != 'hooks')
          moduleHtml += build('th', prop);

      var rows = '';
      for(var i = 0; i < data.length; i++) {
        var module = data[i];
        var innerModules = '';
        for(var prop in module)
          if(prop != 'hooks')
            innerModules += build('td', module[prop].toString());
        moduleHtml += build('tr', innerModules, {}, getRowClassById(module._id));

        // Update old module or generate dialog for new module.
        if(modules[module._id]) {
          var dialog = modules[module._id].dialog;
          dialog.update(module);
          module.dialog = dialog;
        }
        else
          module.dialog = SmartHome.dialogs.generateModuleDialog(module);
        modules[module._id] = module;
      }

      modulesDialog.$.find('table').replaceWith(build('table', moduleHtml, {}, 'unselectable'));
      highlightModuleRows(SmartHome.layout.getSelectedComponent());
      modulesDialog.$.find('table').on('click','tr', onModuleSelect);
    }
  };

  var onModuleSelect = function(event) {
    event.preventDefault();
    var row = $(this);

    // Open or close module dialog.
    if(row.index() > 0) { // Index 0 is the header row.
      var module = modules[row.find('td:first-child').text()];
      if(row.toggleClass('active').hasClass('active'))
        module.dialog.show();
      else
        module.dialog.hide();
    }
  };

  var init = function() {
    modulesDialog = new SmartHome.dialogs.BasicDialog('modulesDialog');
    SmartHome.sockets.on('modules', loadModules);
  };

  return {
    init: init,
    highlightModuleRows: highlightModuleRows,
    show: show
  };
})();
