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
		// require lesson template
		require(['text!templates/lesson/' + this.lesson + '.html'
			      ], function (lessonTemplate) {

			var $template = $(lessonTemplate);

			window.appView.render($template);

			// wait for #content to be appended
			setTimeout(function() {
				self.initPreview();
			}, 0);

		});
	},
	initPreview: function() {
		var $code = this.$el.find('.code');
		this.pv = new PreviewView({ el: $code });
	},
	destroy: function() {
		if ( this.pv ) { this.pv.destroy(); }
	}
});

return LessonView;

});