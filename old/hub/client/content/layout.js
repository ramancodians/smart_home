
SmartHome.layout = (function() {
  var components = [];
  var selectedComponent = -1;

  var getSelectedComponent = function() {
    return selectedComponent;
  }

  var emitSelectedComponent = function(topic, payload) {
    if(selectedComponent > -1) {
      payload.component = selectedComponent;
      SmartHome.sockets.emit(topic, payload);
    }
  }

  var processMagicPlanSVG = function(url, element) {
    var snap = Snap(element);
    Snap.load(url, function(fragment) {

      // Select primary container element g.
      var g = fragment.selectAll('g[id^="surface"]')[0];
      var count = 0;
      g.selectAll('path').forEach(function(el) {
        var bb = el.getBBox();

        /*
         * The first 2 paths represent the layout of the entire floor plan.
         * Paths numbered above 2 are the individual components of the house,
         * such as doors, windows, etc.
         */
        if(count == 1)
          snap.attr({viewBox: 359+','+1480+','+bb.width*1.38+','+bb.height*1.38});
        else if(count > 2)
          components[count - 3] = bb;
        count = count + 1;
      });

      // Merge all intersecting components based on their bounding boxes.
      var i, j, icmp, jcmp;
      for(i = 0; i < components.length - 1; i++) {
        icmp = components[i];
        if(icmp != null) {
          var merged = true;
          while(merged) {
            merged = false;
            for(j = i + 1; j < components.length; j++) {
              jcmp = components[j];
              if(intersectRects(icmp, jcmp)) {
                icmp = mergeRects(icmp, jcmp);
                merged = true;
                components.splice(j, 1);
              }
            }
          }
          components[i] = g.rect(icmp.x, icmp.y, icmp.width, icmp.height).attr({
            fill: 'lightblue',
            opacity: 0,
            strokeWidth:'2',
            stroke:'black',
            strokeOpacity: 0.8
          }).click(onClickComponent(i));
        }
      }
      snap.append(fragment);
    });
  };

  var onClickComponent = function(i) {
    return function(event) {
      // Highlight selected component.
      if(selectedComponent > -1)
        components[selectedComponent].attr({opacity:0});
      this.attr({opacity:0.4});

      selectedComponent = i;
      document.getElementById('selectedComponent').innerHTML = selectedComponent;
      SmartHome.modules.highlightModuleRows(selectedComponent);
    }
  }

  var intersectRects = function(r1, r2) {
    return !(r2.x > (r1.x+r1.width) ||
            (r2.x+r2.width) < r1.x ||
             r2.y > (r1.y+r1.height) ||
            (r2.y+r2.height) < r1.y);
  };

  var mergeRects = function(r1, r2) {
    var x = Math.min(r1.x, r2.x);
    var y = Math.min(r1.y, r2.y);
    var width = Math.max(r1.x + r1.width, r2.x + r2.width) - x;
    var height = Math.max(r1.y + r1.height,r2.y + r2.height) - y;

    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  return {
    processMagicPlanSVG: processMagicPlanSVG,
    getSelectedComponent: getSelectedComponent,
    emitSelectedComponent: emitSelectedComponent
  }
})();
