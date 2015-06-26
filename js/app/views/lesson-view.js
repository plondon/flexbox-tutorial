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

			setTimeout(function() {
				window.appView.render($template);

				// wait for #content to be appended
				setTimeout(function() {
					self.initPreview();
				}, 0);

			}, window.wait);
		});
	},
	initPreview: function() {
		var $code = this.$el.find('.code');
		this.pv = new PreviewView({ el: $code });
	},
	destroy: function() {
		this.pv.destroy();
	}
});

return LessonView;

});