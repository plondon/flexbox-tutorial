define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

"use strict";

var CodeReView = Backbone.View.extend({
	initialize: function(opts) {
		this.parent = opts.parent;
		this.answers = opts.answers;
		this.property = opts.property + ': ';
		this.complete = false;

		this.bindEvents();
	},
	isValid: function() {
		if ( this.complete ) { return; }
		var code = this.strip();

		_.each(this.answers, _.bind(function(answer) {

			var valid = code.indexOf(this.property + answer);
			if ( valid > -1 ) { 
				this.complete = true; 
				this.completed();
			}

		}, this));
	},
	strip: function() {
		return this.$el.text().replace(/\d/g, '').replace(' ', '');
	},
	completed: function() {
		appRouter.hv.toggleNav();
		setTimeout(function() {
			appRouter.hv.$el.find('li.active').addClass('valid');
			setTimeout(function() {
				appRouter.hv.toggleNav();
			}, 2000);
		}, 500);
	},
	destroy: function() {
		this.remove();
	},
	bindEvents: function() {
		$(document).on('keyup', _.bind(this.isValid, this));
	}
});

return CodeReView;

});