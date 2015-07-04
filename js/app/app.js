define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'views/footer',
  'views/lesson-view',
  'text!templates/home.html'
], function ($, _, Backbone, AppView, FooterView, LessonView, HomeTemplate) {

"use strict";

var AppRouter = Backbone.Router.extend({
	initialize: function() {
		this.init = false;
	},
	routes: {
		"": "home",
		"lesson/:number": "render",
	},
	home: function() {
		this.reset();
		window.appView.changePage();
		var $template = $(HomeTemplate);
		var wait = this.init ? window.wait : 0;

		setTimeout(function() {
			window.appView.render($template);
		}, wait);

		this.init = true;
	},
	render: function(number) {
		this.reset();
		window.appView.changePage();
		var wait = this.init ? window.wait : 0;

		setTimeout(_.bind(function() {
			this.lv = new LessonView({ el: $('#content'), lesson: number });
			this.fv = new FooterView({ el: $('#footer'), page: number });
		}, this), wait);

		this.init = true;
	},
	reset: function() {
		if ( this.fv ) { this.fv.destroy(); }
		if ( this.lv ) { this.lv.destroy(); }
	}
});

$(document).ready(function() {
	window.$ = jQuery;
	window.max = 3;
	window.wait = 1000;

	window.appView = new AppView({ el: $('body') });
	window.appRouter = new AppRouter();
	Backbone.history.start({pushState: true});
});

});