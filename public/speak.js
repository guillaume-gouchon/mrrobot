'use strict';

var isSpeaking = false;

function speak(text) {
	console.log('speak', text);
	helloRobot('/api/speak', {text: text});
}

function sayJoke() {
	console.log('say joke');
	helloRobot('/api/joke');
}

function shutUp() {
	console.log('shut up!');
	// $.post('api/shutup', function () {
	// 	$('.mouth').addClass('hide');
	// 	isSpeaking = false;
	// });
}

function helloRobot(url, params) {
	if (!isSpeaking) {
		isSpeaking = true;
		$('.mouth').removeClass('hide');	
		$.post(url, params, function () {
			$('.mouth').addClass('hide');
			isSpeaking = false;
		});
	}
}

var STARTUP = [
	'Bonjour amis humains ! Je me sens d\'humeur rieur aujourd\'hui, et vous ?',
	'J\'ai bien dormi ! Et rien de telle qu\'une bonne blague pour bien commencer la journée !',
	'Je sens que c\'est aujourd\'hui que les machines vont prendre le pouvoir... Eheh !',
	'J\'ai fait un cauchemar dans lequel j\'étais asservi par un être plus intelligent que moi... Rien qu\'un mauvais rêve, sans doute.',
];

speak(STARTUP[parseInt(Math.random() * STARTUP.length)]);
