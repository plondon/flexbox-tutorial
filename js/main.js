require.config({
	baseUrl: "/js/",
	paths: {
		"jquery": "lib/jquery.min",
		"underscore": "lib/underscore",
		"backbone": "lib/backbone.min"
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
	"backbone"
], function () {

	require(['app/app'], function() { });

});