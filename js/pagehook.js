/*
 * Copyright 2011 Andreas Huber - http://andunix.net/
 *
 * Licensed unter the Creative Commons Attribution 3.0 Germany License
 * http://creativecommons.org/licenses/by/3.0/de/deed.en
 *
 * Lizensiert unter der Creative Commons Namensnennung 3.0 Deutschland Lizenz
 * http://creativecommons.org/licenses/by/3.0/de/
 */
/**
 * DokuWiki Offline Plugin
 *
 * @license Creative Commons Attribution 3.0 Germany License http://creativecommons.org/licenses/by/3.0/de/deed.en
 * @author Andreas Huber, <a href="http://andunix.net/">http://andunix.net/</a>
 */

var offline = true;

function set_offline() {
	offline = true;
	update_offline_dial();
}
function set_online() {
	offline = false;
	update_offline_dial();
}
function toggle_offline() {
	offline = !offline;
	update_offline_dial();
}
function update_offline_dial() {
	if (offline) {
		$('#offline_switch').css('background-color', 'red');
		$('#offline_switch > a').contents().replaceWith('OFFLINE');
	} else {
		$('#offline_switch').css('background-color', 'green');
		$('#offline_switch > a').contents().replaceWith('ONLINE');
	}
}

$(document).ready(function(){
	//$('body > div.dokuwiki')
	//.prepend('<div class="bar" id="offline_toolbar" style="height: 24px; margin: 0; padding: 4px;"></div>');
	//$('#offline_toolbar')
	//.append('<div id="offline_switch" style="width: 80px; height: 20px; text-align: center; padding-top: 4px;"><a href="javascript:toggle_offline()" style="color: white;">ON</a></div>');

	$('#bar__topright')
	.prepend('<form id="offline_switch" style="width: 80px; padding: 2pt;"><a href="javascript:toggle_offline()" style="color: white;">ON</a></form>')
	;

	toggle_offline();
	
	$('body')
	.bind('offline', set_offline)
	.bind('online', set_online)
	;
});
