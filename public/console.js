'use strict';

var CODE_FREQUENCY = 600;
var CODING_SPEED = 5;

var Typer = {
	
	text: null,
	accessCountimer: null,
	index: 0,
	speed: CODING_SPEED,
	file: 'kernel.txt',

	init: function() {
		this.accessCountimer = setInterval(function() { Typer.updLstChr(); }, 200);
		$.get(this.file, function (data) {
			Typer.text = data;
		});
	},

	content: function() {
		return $('#console').html();
	},

	write: function(str) {
		$('#console').append(str);
		return false;
	},

	addText: function() {
		var content = this.content();
		if(content.substring(content.length-1,content.length)=='|') {
			// if the last char is the blinking cursor
			// remove it before adding the text
			$('#console').html($('#console').html().substring(0,content.length-1));
		} 
		
		this.index += this.speed * 6;

		var text = $('<div/>').text(this.text.substring(0,this.index)).html();
		var rtn = new RegExp('\n', 'g'); // newline regex
		var rts = new RegExp('\\s', 'g'); // whitespace regex
		var rtt = new RegExp('\\t', 'g'); // tab regex
		// replace newline chars with br, tabs with 4 space and blanks with an html blank
		$('#console').html(text.replace(rtn, '<br/>').replace(rtt, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(rts, '&nbsp;'));
		window.scrollBy(0, 50); // scroll to make sure bottom is always visible
	},

	updLstChr: function() { // blinking cursor
		var content = this.content();
		if (content.substring(content.length - 1, content.length) == '|') {
			// if last char is the cursor
			// remove it
			$('#console').html($('#console').html().substring(0, content.length-1));
		} else {
			// else write it
			this.write('|');
		}
	}
};

Typer.init();

setInterval(function () {
	Typer.addText();
}, CODE_FREQUENCY);
