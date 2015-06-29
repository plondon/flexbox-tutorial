require.config({
	baseUrl: "/js/app",
	paths: {
		"jquery": "../lib/jquery.min",
		"underscore": "../lib/underscore.min",
		"backbone": "../lib/backbone.min",
		"text": "../lib/text",
		"imagesloaded": "../lib/jquery.imagesloaded"
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		imagesloaded: {
			deps: ["jquery"]
		}
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	waitSeconds: 0
});

require([
	"jquery",
	"underscore",
	"backbone",
	"text",
	"imagesloaded"
], function () {

	require(['app'], function() { });

});