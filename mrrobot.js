#!/usr/bin/env node
'use strict';

var express = require('express');
var app = express();
var speak = require('./controllers/speak');
var listen = require('./controllers/listen');
var joke = require('./controllers/joke');
var sentences = require('./data/sentences');

// setup API and client
app.use('/', express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({
	extended: true
})); 

app.get('/api/ping', function (req, res) {	
	res.send(speak.isSpeaking());
});

app.listen(3000, function () {
  console.log('MrRobot has started on port 3000');
});

// start listening
// listen({

// 	joke: joke,

// 	fun: function () {
// 		speak.say('Comme ma bite');
// 	}

// });

setTimeout(function() {
	// say startup fun
	speak.say(sentences.getStartup());
}, 12000);
