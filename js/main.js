require.config({
	baseUrl: "/js/app",
	paths: {
		"jquery": "../lib/jquery.min",
		"underscore": "../lib/underscore.min",
		"backbone": "../lib/backbone.min",
		"text": "../lib/text",
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		}
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	waitSeconds: 0
});

require([
	"jquery",
	"underscore",
	"backbone",
], function () {

	require(['app'], function() { });

});