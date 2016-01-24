'use strict';

function ping() {
	$.get('/api/ping', function (isSpeaking) {
		if (isSpeaking) {
			$('.mouth').removeClass('hide');
		} else {
			$('.mouth').addClass('hide');
		}
	});
}

setInterval(ping, 500);
