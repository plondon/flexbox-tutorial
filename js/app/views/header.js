define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

"use strict";

var HeaderView = Backbone.View.extend({
	initialize: function(opts) {
		this.open = true;
		this.page = parseInt(opts.page);
		this.$lessons = this.$el.find('li');

		this.toggleNav();
		this.render();
	},
	render: function() {
		this.$lessons.removeClass('active');
		var cur = this.$lessons.splice(this.page - 1, 1);
		
		$(cur).addClass('active');
	},
	toggleNav: function(e) {
		if ( this.open ) {
			this.open = false;
			this.$el.removeClass('active');
		} else {
			this.open = true;
			this.$el.addClass('active');
		}
	},
	reset: function() {
		this.$lessons.removeClass('active');
	},
	events: {
		'click .toggle': 'toggleNav'
	}
});

return HeaderView;

});