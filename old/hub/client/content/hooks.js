SmartHome.hooks = (function() {
  var hooksDialog;

  var registerHook = function(module) {
    return function(event) {
      var events = [];

      // Retrieve hook events.
      hooksDialog.$.find('tr').each(function() {
        var row = $(this);
        if(row.index() > 0) {
          var topic = row.find('td:nth-child(3) option:selected').text() +
            row.find('td:nth-child(1) label').text();
          var payload = row.find('td:nth-child(4) input').val();
          events.push({ topic: topic, payload: payload });
        }
      });

      // Retrieve hook condition.
      var payload = {
        _id: module._id,
        topic: hooksDialog.$.find('#topicSelect option:selected').text(),
        cond: hooksDialog.$.find('#condSelect option:selected').text(),
        target: hooksDialog.$.find('#targetField').val(),
        events: events
      };
      SmartHome.sockets.emit('addHook', payload);
      hooksDialog.hide();
    }
  };

  var init = function() {
    hooksDialog = new SmartHome.dialogs.BasicDialog('hookRegistrationDialog');

  	document.getElementById('notificationButton').addEventListener(
  		"click", generateHookOutput(['email', 'phone'], 'notification'), false);
  	document.getElementById('delayButton').addEventListener(
  		"click", generateHookOutput(['millis'], 'delay'), false);
  };

  // Method to add non module hook output.
  var generateHookOutput = function(incomingTopics, title) {
    return addHookOutput({
      incoming_topics: incomingTopics,
      _id: '',
      title: title
    });
  };

  // Build and append table row for hook output.
  var addHookOutput = function(module) {
    return function() {
      var innerSelect = '';
      for(var j = 0; j < module.incoming_topics.length; j++) {
        var topic = module.incoming_topics[j];
        innerSelect += build('option', topic, { value: topic });
      }
      var options = '';
      options += build('button', 'up', { id:'up' });
      options += build('button', 'down', { id:'down' });
      options += build('button', 'delete', { id:'delete' });

      var rowContents = [build('label', module._id),
                         build('label', module.title),
                         build('select', innerSelect),
                         build('input'), options];

      var row = $(build('tr', buildTableRow(rowContents)));
      row.find('#delete').click(function() {
        row.remove();
      });
      row.find('#up').click(function() {
        var prev = row.prev();
        if(prev.index() > 0)
          prev.insertAfter(row);
      });
      row.find('#down').click(function() {
        row.insertAfter(row.next());
      });

      hooksDialog.$.find('table').append(row);
    }
  };

  var show = function(module) {
    return function() {
      var html = '';
      var topic;
      for(var i = 0; i < module.outgoing_topics.length; i++) {
        topic = module.outgoing_topics[i];
        html += build('option', topic, { value: topic });
      }
      hooksDialog.$.find('#topicSelect').html(html);
      hooksDialog.$.find('#registerButton').unbind('click').click(registerHook(module));
      hooksDialog.$.dialog('option', 'title', 'Register Hook @ ' + module.title + '(' + module._id + ')');
      hooksDialog.$.dialog('open');
    }
  };

  return {
    init: init,
    addHookOutput: addHookOutput,
    show: show
  };
})();
