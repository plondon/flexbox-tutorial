define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

"use strict";

var CodeReView = Backbone.View.extend({
	initialize: function(opts) {
		this.parent = opts.parent;
		this.length = opts.answers.length;
		this.answers = opts.answers;
		this.property = opts.property + ': ';
		this.complete = [];

		this.bindEvents();
	},
	isValid: function() {
		if ( this.completed || this.lessonCompleted() ) { return; }

		_.delay(_.bind(function() {

			if ( this.complete.length === this.length ) { 
				this.done(); 
				return; 
			}

			var code = this.$el.text();

			_.each(this.answers, _.bind(function(answer) {

				var valid = code.indexOf(this.property + answer);
				var dup = this.complete.indexOf(answer);

				if ( valid > -1 && dup === -1) {
					
					this.complete.push(answer);

				}

			}, this));

		}, this), 100);
	},
	done: function() {
		this.completed = true;
		appRouter.hv.$el.find('li.active').addClass('valid');
	},
	lessonCompleted: function() {
		return appRouter.hv.$el.find('li.active').hasClass('valid');
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