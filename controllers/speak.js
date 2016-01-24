'use strict';

var exec = require('child_process').exec;

var PITCH = 80;
var LANGUAGE = 'fr';

var isSpeaking = false;

module.exports = {

	say: function (text, callback) {
		console.log('saying "' + text + '"');
		if (!isSpeaking) {
			isSpeaking = true;
			
			var command = 'espeak -s 170 -p ' + PITCH + ' -v ' + LANGUAGE  + ' -m "' + text + '"'; 
			exec(command, function (error, stdout, stderr) {
				isSpeaking = false;
				
				if (callback) {
		 			callback();
		 		}
			});
		}
	},

	isSpeaking: function () {
		return isSpeaking;
	}
	
};
