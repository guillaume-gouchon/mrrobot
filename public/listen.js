'use strict';

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'fr-FR';

recognition.onstart = function() {
	console.log('onstart');
};

recognition.onerror = function(event) {
	console.log('onerror', event.error);
};

recognition.onend = function() {
	console.log('onend');
	recognition.start();
};

recognition.onresult = function(event) {
	var transcript = '';
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal) {
			transcript += event.results[i][0].transcript;
		}

		console.log(event.results[i][0].transcript);
	}

	console.log(transcript);

	if (transcript.indexOf('grosse') >= 0 || transcript.indexOf('grande') >= 0 || transcript.indexOf('énorme') >= 0) {
		speak('Comme ma bite !');
	} else if (transcript.indexOf('blague') >= 0 || transcript.indexOf('histoire') >= 0) {
		sayJoke();
	} else if (transcript.indexOf('ta gueule') >= 0) {
		shutUp();
	}
};

recognition.start();
