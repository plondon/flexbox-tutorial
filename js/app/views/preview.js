define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

"use strict";

var PreviewView = Backbone.View.extend({
	initialize: function(opts) {
		var $html = this.$el.find('#html-code');
		var $css = this.$el.find('#css-code');

		/* initialize html editor */
		this.htmlEditor = CodeMirror.fromTextArea(($html[0]), {
		  mode: 'htmlmixed',
		  theme: 'monokai',
		  tabSize: 2,
		  lineNumbers: true,
		  readOnly: true
		});

		/* initialize css editor */
		this.cssEditor = CodeMirror.fromTextArea(($css[0]), {
			mode: 'css',
			theme: 'monokai',
			tabSize: 2,
			lineNumbers: true
		});

		/* bind events */
		this.bindEvents();
		
		/* trigger events */
		this.triggerEvents();
	},
	resetCSS: function() {
		/* grab css from editor */
		var css = this.cssEditor.getValue();

		/* get the range of style tags */ 
		var range = this.getRange();
		var start = $(range[0]).parent().parent().parent().index();
		var end = $(range[1]).parent().parent().parent().index();

		/* replace style tags with css */ 
		this.htmlEditor.replaceRange(css, {line: start + 1, ch: 0}, {line: end - 1, ch: 1000});
	},
	getRange: function() {
		return $('#html-code').next().find('span').filter(function() {
			return $(this).text() === 'style';
		});
	},
	updatePreview: function() {
	  var previewFrame = document.getElementById('preview');
	  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
	  preview.open();
	  preview.write(this.htmlEditor.getValue());
	  preview.close();
	},
	showHTML: function() {
		var active = $('.html').hasClass('active');

		if (active) { return; }

		$('.css').removeClass('active');
		$('.html').addClass('active');
	},
	showCSS: function() {
		var active = $('.css').hasClass('active');

		if (active) { return; }

		$('.html').removeClass('active');
		$('.css').addClass('active');
	},
	bindEvents: function() {
		var delay;

		this.cssEditor.on("change", _.bind(function() {
		  clearTimeout(delay);
		  delay = _.delay(_.bind(this.resetCSS, this), 100);
		}, this));

		this.htmlEditor.on("change", _.bind(function() {
		  clearTimeout(delay);
		  delay = _.delay(_.bind(this.updatePreview, this), 100);
		}, this));

		$('#html-toggle').on('click', _.bind(this.showHTML, this));
		$('#css-toggle').on('click', _.bind(this.showCSS, this));
	},
	triggerEvents: function() {
		$('#css-toggle').click();
		_.delay(_.bind(this.updatePreview, this), 100);
	},
	destroy: function() {

	}
});

return PreviewView;

});