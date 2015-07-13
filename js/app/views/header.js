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

		this.bindEvents();
	},
	render: function() {
		this.$lessons.removeClass('active');
		if ( !this.page ) { return; }

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
	closeNav: function() {
		if ( this.open ) {
			this.toggleNav();	
		}
	},
	escape: function(e) {
		if ( e.keyCode === 27 ) { this.closeNav(); }
	},
	bindEvents: function() {
		$(document).on('keyup', _.bind(this.escape, this));
	},
	destroy: function() {
		this.$lessons.removeClass('active');
	},
	events: {
		'click .toggle': 'toggleNav'
	}
});

return HeaderView;

});