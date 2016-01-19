'use strict';

var request = require('request');
var cheerio = require('cheerio');

var WEBSITE_URL = 'http://humour-blague.com/blagues-2/index.php';
var LANGUAGE = 'fr';

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

module.exports = function (callback, filters) {
	console.log('finding a joke...');

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

            callback(joke);
        } else {
        	callback(null);
        }
    });

};
