'use strict';

var speak = require('./speak');
var sentences = require('../data/sentences');
var fs = require('fs');

var jokes = JSON.parse(fs.readFileSync('./data/jokes.json', 'utf8'));

function getRandomJoke() {
    return jokes[parseInt(Math.random() * jokes.length)];
}

module.exports = function () { 
    speak.say(sentences.getIntro(), function () {
        setTimeout(function () {
            speak.say(getRandomJoke(), function () {
                setTimeout(function () {
                    speak.say(sentences.getOutro());
                }, 1000);
            });
        }, 500);
    });
};
