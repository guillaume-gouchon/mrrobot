#!/usr/bin/env node
'use strict';

var findJoke = require('./controllers/joke');
var speak = require('./controllers/speak');

var INTROS = [
	'On va bien rigoler !',
	'Je commence...',
	'Tiens, j\'ai une bonne blague!',
	'Attention, celle-ci est drôle!',
	'Préparez-vous à bien vous marrer !',
	'Ecoutez-moi, j\'en ai une bien bonne'
];

var OUTROS = [
	'Ah! Ah! Ah! Je me tords de rire.',
	'Vous avez compris, stupides humains ?',
	'Je l\'ai mal raconté mais normalement, elle est drôle.',
	'Vous ne comprenez rien à l\'humour de robot.',
	'C était une blague avant-gardiste.',
	'Je préfère la blague 00110101, mais bon...',
	'Guillaume Gouchon m\'a tout appris, surtout l\'humour fin.'
];

function sayJoke(callback) {
	findJoke(function (joke) {
		if (joke) {
			speak(INTROS[parseInt(Math.random() * INTROS.length)], function () {
				setTimeout(function () {
					speak(joke, function () {
						setTimeout(function () {
							speak(OUTROS[parseInt(Math.random() * OUTROS.length)], function () {
								callback();
							});
						}, 500);
					});
				}, 500);
			});
		} else {
			speak('Je ne trouve aucune blague... désolé', function () {
				callback();
			});
		}
	});
}

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/api/speak', function (req, res) {
	speak(req.body.text, function () {
		res.sendStatus(200);
	});
});

app.post('/api/joke', function (req, res) {
	sayJoke(function () {
		res.sendStatus(200);
	});
});

app.listen(3000, function () {
  console.log('MrRobot has started on port 3000');
});
