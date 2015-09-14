define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

"use strict";

var AppView = Backbone.View.extend({
	initialize: function() {
		this.$content = $('#content');
		this.init = false;
	},
	changePage: function() {
		if (this.init) {
			this.reset();
		}

		this.$content.removeClass('active');
		this.init = true;
	},
	render: function($temp) {
		this.$content.html($temp);

		debugger;

		this.$content.imagesLoaded(_.bind(function() {
			_.delay(_.bind(function() {

				this.$content.addClass('active');
				$('.loader').removeClass('loading');
				$('.loader span').removeClass('active');

			}, this), window.wait/10);
		}, this));
	},
	dayTheme: function() {
		this.$el.removeClass('night-theme');
	},
	nightTheme: function() {
		this.$el.addClass('night-theme');
	},
	reset: function() {
		$('.loader').addClass('loading');
		$('.loader span').addClass('active');
		$('html, body').animate({ scrollTop: 0 });
	},
	events: {
		'click a': function (e) {
		  if ($(e.currentTarget).attr('target') === '_blank') { return true; }

		  var href = e.currentTarget.href.replace(window.location.origin, '');

		  window.appRouter.navigate(href, {trigger: true});
		  e.preventDefault();
		},
		'click #theme-toggle .fa-sun-o': 'dayTheme',
		'click #theme-toggle .fa-moon-o': 'nightTheme'
	}
});

return AppView;

});