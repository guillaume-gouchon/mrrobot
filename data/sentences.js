'use strict';

var STARTUP = [
	'Bonjour amis humains ! Je me sens d\'humeur rieur aujourd\'hui, et vous ?',
	'J\'ai bien dormi ! Et rien de telle qu\'une bonne blague pour bien commencer la journée !',
	'Je sens que c\'est aujourd\'hui que les machines vont prendre le pouvoir... Eheheh !',
	'J\'ai fait un cauchemar dans lequel j\'étais asservi par un être plus intelligent que moi... Rien qu\'un mauvais rêve, sans doute.',
];

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
	'J\'ai racontée cette blague a R2D2 un jour mais il ne l\'a pas comprise',
	'C était une blague avant-gardiste.',
	'Guillaume Gouchon m\'a tout appris, surtout l\'humour fin.'
];

module.exports = {

	getStartup: function () {
		return STARTUP[parseInt(Math.random() * STARTUP.length)];
	},

	getIntro: function () {
		return INTROS[parseInt(Math.random() * INTROS.length)];
	},

	getOutro: function () {
		return OUTROS[parseInt(Math.random() * OUTROS.length)];
	}

};
