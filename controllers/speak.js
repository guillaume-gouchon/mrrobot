'use strict';

var exec = require('child_process').exec;

var PITCH = 70;
var SPEED = 170;
var LANGUAGE = 'fr';

var isSpeaking = false;

module.exports = {

	say: function (text, callback) {
		console.log('saying "' + text + '"');
		if (!isSpeaking) {
			isSpeaking = true;
			
			var command = 'espeak -s ' + SPEED + ' -p ' + PITCH + ' -v ' + LANGUAGE  + ' -m "' + text + '"'; 
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
