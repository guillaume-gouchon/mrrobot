'use strict';

var exec = require('child_process').exec;

var PITCH = 20;
var LANGUAGE = 'fr';

module.exports = function (text, callback) {
	console.log('saying "' + text + '"');
	
	var command = 'espeak -s 200 -p ' + PITCH + ' -v ' + LANGUAGE  + ' -m "' + text + '"'; 
	exec(command, function (error, stdout, stderr) {
		if (callback) {
 			callback();
 		}
	});
};
