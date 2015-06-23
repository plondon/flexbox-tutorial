define([
  'jquery',
  'underscore',
  'backbone',
  'views/preview'
], function ($, _, Backbone, PreviewView) {

"use strict";

var LessonView = Backbone.View.extend({
	initialize: function(opts) {
		this.lesson = opts.lesson;
		this.$content = $('#content');

		var self = this;
		require(['text!templates/lesson/' + this.lesson + '.html'
			      ], function (lessonTemplate) {

			var $template = $(lessonTemplate);
			window.appView.render($template);
			self.initPreview();
		});
	},
	render: function() {
		this.initPreview();
	},
	initPreview: function() {
		var $code = this.$el.find('.code');
		this.pv = new PreviewView({ el: $code });
	},
	destroy: function() {
		this.$content.html('');

		this.pv.destroy();
	}
});

return LessonView;

});