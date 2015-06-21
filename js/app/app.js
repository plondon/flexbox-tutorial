define([
  'jquery',
  'underscore',
  'backbone',
  'views/lesson-view'
], function ($, _, Backbone, LessonView) {

"use strict";

var AppRouter = Backbone.Router.extend({
	initialize: function() {
		console.log('ready');
	},
	routes: {
		"lesson/:number": "render"
	},
	render: function(number) {
		if ( this.lv ) { this.lv.destroy(); }
		this.lv = new LessonView({ el: $('#content'), lesson: number });
	},
});

$(document).ready(function() {
	// ugh
	window.$ = jQuery;

	var router = new AppRouter();
	Backbone.history.start({pushState: true});
});

});