#!/usr/bin/env node
'use strict';

var exec = require('child_process').exec;
var express = require('express');
var app = express();

var speak = require('./controllers/speak');
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

app.post('/api/joke', function (req, res) {
	joke(function () {
		res.sendStatus(200);		
	});
});

app.post('/api/fun', function (req, res) {
	speak.say('Comme ma bite', function () {
		res.sendStatus(200);		
	});
});

app.listen(3000, function () {
	console.log('MrRobot has started on port 3000');
});

setTimeout(function() {
	// say startup fun
	speak.say(sentences.getStartup());
}, 10000);
