define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/footer.html'
], function ($, _, Backbone, FooterTemplate) {

"use strict";

var FooterView = Backbone.View.extend({
	initialize: function(opts) {
		this.page = opts.page;

		this.render();
	},
	render: function() {
		var data = { page: this.page };
		var $temp = $(_.template(FooterTemplate, data));

		this.$el.html($temp).addClass('active');
	},
	destroy: function() {
		this.$el.html('');
	}
});

return FooterView;

});