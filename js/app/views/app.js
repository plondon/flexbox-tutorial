define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

"use strict";

var AppView = Backbone.View.extend({
	initialize: function() {
		this.$content = $('#content');
	},
	changePage: function() {
		this.$content.removeClass('active');
	},
	render: function($temp) {
		this.$content.html($temp);
		_.delay(_.bind(function() {

			this.$content.addClass('active');

		}, this), 100);
	},
	events: {
		'click a:not(a.outside-link)': function (e) {
		  if ($(e.currentTarget).attr('target') === '_blank') { return; }

		  var href = e.currentTarget.href.replace(window.location.origin, '');

		  window.appRouter.navigate(href, {trigger: true});
		  e.preventDefault();
		}
	}
});

return AppView;

});