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
		this.completedLessons = Cookies.get('completedLessons') ? Cookies.get('completedLessons') : '';

		this.$active = appRouter.hv.$el.find('li.active');

		this.setValid();
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
		this.$active.addClass('valid');

		this.completedLessons += ' ' + this.$active.index();
		Cookies.set('completedLessons', this.completedLessons);

		this.alertSuccess();
	},
	alertSuccess: function() {
		// only render once
		if ( this.$active.hasClass('finished') ) { return; }

		// wait for codemirror code to render
		_.delay(_.bind(function() {
			
			this.$active.addClass('finished');
			
			$('body').addClass('finished');
			
			_.delay(function() {

				$('body').removeClass('finished');

			}, window.wait);

		}, this), 100);
	},
	lessonCompleted: function() {
		return this.$active.hasClass('valid');
	},
	setValid: function() {
		if ( this.completedLessons.length ) {
			var ary = this.completedLessons.split(' ');
			var l = ary.length;
			ary = ary.slice(1, l);

			ary.forEach(function(i) {
				var valid = appRouter.hv.$el.find('li')[i];
				$(valid).addClass('valid');
			});
		}
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