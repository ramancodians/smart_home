
SmartHome.dialogs =  (function() {
  var Decoder = new TextDecoder('utf-8');

  class BasicDialog {
    constructor(id) {
      var settings = {
        position: { my: "left top", at: "left top" },
        closeOnEscape: false,
        autoOpen: false,
        width: 'auto',
        height: 'auto'
      };

      this.$ = $("#" + id);
      this.$.dialog(settings);
    }

    show() { this.$.dialog('open'); }
    hide() { this.$.dialog('close'); }
    $() { return this.$; }
  }

  class ModuleDialog {
    constructor(module, html, autoLabels) {
      var self = this;
      self.topicHandlers = {};

      // Automatically generate outgoing topic labels and handlers.
      if(autoLabels) {
        var labels = '';
        for(var i = 0; i < module.outgoing_topics.length; i++) {
          var topic = module.outgoing_topics[i];
          labels += build('label', topic + ': ');
          labels += build('label', 'N/A', {id:topic}) + build('p');
          self.generateLabelHandler(topic);
        }
        html = labels + html;
      }

      html += build('p') + build('p', 'Hooks (click to delete):') + build('table');
      html = build('div', html, {
        id: module._id,
        title: module.title + ' (' + module._id + ')'
      });

      var buttons = [];
      buttons.push({ text: "Place", click: function () {
        SmartHome.layout.emitSelectedComponent('placeModule', {_id: module._id});
      }});
      buttons.push({ text: "Remove", click: function () {
        SmartHome.layout.emitSelectedComponent('removeModule', {_id: module._id});
      }});
      if(module.outgoing_topics.length > 0) {
        buttons.push({text: "Hook In", click: SmartHome.hooks.show(module)});
      }
      if(module.incoming_topics.length > 0) {
        buttons.push({text: "Hook Out", click: SmartHome.hooks.addHookOutput(module)});
      }

      var settings = {
        closeOnEscape: false,
        autoOpen: false,
        dialogClass: "noclose",
        width: '500',
        height: '300',
        buttons: buttons
      };
      var css = {
        'background' : '#699cfc'
      };

      self.$ = $(html);
      $('body').append(self.$);
      self.$.dialog(settings).css(css);
      self.update(module);
    }

    update(module) {
      var self = this;
      var html = "";
      var hooks = module.hooks;
      for(var i = 0; i < hooks.length; i++) {
        var entry = hooks[i].topic + ' ' + hooks[i].cond + ' (' + hooks[i].target + ') --> [';
        var events = hooks[i].events;
        for(var k = 0; k < events.length; k++)
          entry += events[k].topic + '(' + events[k].payload + '), ';
        html += build('tr', build('td', entry + ']'));
      }

      var hooksTable = self.$.find('table');
      hooksTable.html(html);
      hooksTable.unbind();
      hooksTable.on('click', 'tr', function(event) {
        event.preventDefault();
        SmartHome.sockets.emit('removeHook', {_id: self.$.attr('id'),
          index: $(this).index()});
      });
    }

    generateLabelHandler(topic) {
      var self = this;
      self.topicHandlers[topic] = function(data) {
        var label = self.$.find('#' + topic);
        label.text(Decoder.decode(data));
      }
    }

    show() {
      // Register topic handlers.
      var id = this.$.attr('id');
      for(var topic in this.topicHandlers) {
        SmartHome.sockets.on(topic + id, this.topicHandlers[topic]);
        SmartHome.sockets.emit('mqttRetain', { topic: topic + id});
      }
      this.$.dialog('open');
    }
    hide() {
      this.$.dialog('close');

      // Unregister topic handlers.
      var id = this.$.attr('id');
      for(var topic in this.topicHandlers)
        SmartHome.sockets.off(topic + id);
    }
  }

  class SentryDialog extends ModuleDialog {
    constructor(module) {
      var html = build('img') +
                 build('button', 'forward', {id:'forward'}) +
                 build('button', 'right', {id:'right'}) +
                 build('button', 'left', {id:'left'}) +
                 build('div');

      super(module, html, false);
      var self = this;

      var slider = self.$.find('div');
      slider.slider({
        range: "max",
        min: 1,
        max: 10,
        value: 1,
        slide: function( event, ui ) {
          $('#amount').val( ui.value );
        }
      });

      function registerDirectionHandler(direction) {
        var button = self.$.find('#' + direction);
        button.click(function() {
          SmartHome.sockets.emit('mqttPublish', {
            topic: direction + self.$.attr('id'),
            payload: slider.slider('value')
          });
        });
      }

      var directions = ['forward', 'left', 'right'];
      for(var i = 0; i < directions.length; i++)
        registerDirectionHandler(directions[i]);

      var img = self.$.find('img');
      self.topicHandlers['image'] = function(data) {
        img.attr('src', "data:image/jpeg;base64," + Decoder.decode(data));
      };
    }
  }

  class HydroponicsDialog extends ModuleDialog {
    constructor(module) {
      var html = build('button', 'Water') +
                 build('input', '', {type:'text'});

      super(module, html, true);
      var self = this;

      var intervalField = self.$.find('input');
      self.$.find('button').click(function() {
        SmartHome.sockets.emit('mqttPublish', {
          topic: 'water' + self.$.attr('id'),
          payload: intervalField.val()
        });
      });
    }
  }

  class LightingDialog extends ModuleDialog {
    constructor(module) {
      var html = build('button', 'ON', {id:'on'}) +
                 build('button', 'OFF', {id:'off'});

      super(module, html, false);
      var self = this;

      var _id = self.$.attr('id');
      self.$.find('#on').click(function(){
        SmartHome.sockets.emit('mqttPublish', {
          topic: 'modify' + _id,
          payload: 'on'
        });
      });
      self.$.find('#off').click(function(){
        SmartHome.sockets.emit('mqttPublish', {
          topic: 'modify' + _id,
          payload: 'off'
        });
      });
    }
  }

  var modules = {
    sentry: SentryDialog,
    hydroponics: HydroponicsDialog,
    lighting: LightingDialog
  }

  /*
   * Return a new dialog specified by the module's title.
   * If no dialog class exists, return generic ModuleDialog
   * class with automatic labels.
   */
  function generateModuleDialog(module) {
    if(modules[module.title]) return new modules[module.title](module);
    else return new ModuleDialog(module, '', true);
  }

  return {
    BasicDialog: BasicDialog,
    generateModuleDialog: generateModuleDialog
  };
})();
