define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'views/lesson-view',
  'text!templates/home.html'
], function ($, _, Backbone, AppView, LessonView, HomeTemplate) {

"use strict";

var AppRouter = Backbone.Router.extend({
	initialize: function() {
		console.log('ready');
	},
	routes: {
		"": "home",
		"lesson/:number": "render"
	},
	home: function() {
		window.appView.changePage();
		var $template = $(HomeTemplate);

		window.appView.render($template);
	},
	render: function(number) {
		window.appView.changePage();
		if ( this.lv ) { this.lv.destroy(); }
		this.lv = new LessonView({ el: $('#content'), lesson: number });
	},
});

$(document).ready(function() {
	window.$ = jQuery;
	window.wait = 1000;

	window.appView = new AppView({ el: $('body') });
	window.appRouter = new AppRouter();
	Backbone.history.start({pushState: true});
});

});