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
		this.property = opts.property;
	},
	destroy: function() {
		this.remove();
	}
});

return CodeReView;

});