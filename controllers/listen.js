'use strict';

var exec = require('child_process').exec;

var LANGUAGE = 'en-us';
var WORDS_FOLDER = __dirname + '/../speech_recognition';

module.exports = function (callback) {
	console.log('start listening...');
	
	var command = 'export LD_LIBRARY_PATH=/usr/local/lib PKG_CONFIG_PATH=/usr/local/lib/pkgconfig; pocketsphinx_continuous -hmm /usr/local/share/pocketsphinx/model/' + LANGUAGE + '/' + LANGUAGE + ' -lm ' + WORDS_FOLDER + '/words.lm -dict ' + WORDS_FOLDER + '/words.dic -samprate 16000/8000/48000 -inmic yes;'; 
	console.log(command);
	
	var listen = exec(command);

	listen.stdout.on('data', function (data) {
	  console.log(data);
	});

	listen.stderr.on('data', function (data) {
	  console.error(data);
	});

	listen.on('exit', function (code) {
	  console.error('child process exited with code ' + code);
	});
};
