var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var WEBSITE_URL = 'http://humour-blague.com/blagues-2/index.php';

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function scrape (callback, filters) {
	console.log('scraping joke...');
	request(WEBSITE_URL, function(error, response, html){
        if(!error){
            var joke = '';

            var $ = cheerio.load(html);
            var lines = $('table .blague')[0].children;

            var line;
			for (var n = 0; n < lines.length; n++) {
				line = lines[n].data;
				if (line) {
					line = replaceAll(line, '"', '');
            		joke += line;
            	}
            }

            callback(joke.length < 500 ? joke : null);
        } else {
        	callback(null);
        }
    });
}

function appendJSON(joke, callback) {
  	var jokeFile = fs.readFileSync('./jokes.json');
  	var jokes = JSON.parse(jokeFile);
  	if (jokes.indexOf(joke) == -1) {
  		console.log('add joke');
		jokes.push(joke);
		console.log('joke #' + jokes.length + ' added');

		var sJokes = JSON.stringify(jokes);
		fs.writeFileSync('./jokes.json', sJokes);
	}

	callback();
}

function startScrape() {
	scrape(function (joke) {
		if (joke) {
			appendJSON(joke, function () {
				startScrape();
			});
		} else {
			startScrape();
		}
	});
}

startScrape();
