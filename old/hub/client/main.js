
var SmartHome = {};

$(document).ready(function() {
	SmartHome.hooks.init();
	SmartHome.layout.processMagicPlanSVG('/img/layout.svg', document.getElementById("layout"));
	SmartHome.modules.init();
  $('#layoutFile').change(SmartHome.sockets.upload('layout', 'image/svg+xml'));
	$("#modulesOpener").click(function() { SmartHome.modules.show(); });
});
