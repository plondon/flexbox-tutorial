define([
  'jquery',
  'underscore',
  'backbone',
  'views/preview',
  'views/codereview'
], function ($, _, Backbone, PreviewView, CodeReView) {

"use strict";

var LessonView = Backbone.View.extend({
	initialize: function(opts) {
		this.lesson = opts.lesson;
		this.$content = $('#content');

		var self = this;
		// require lesson template
		debugger;
		require(['text!templates/lesson/' + this.lesson + '.html'
			      ], function (lessonTemplate) {

			var $template = $(lessonTemplate);

			window.appView.render($template);

			// wait for #content to be appended
			setTimeout(function() {
				self.initPreview();
				self.validSwitch();
			}, 0);

		});
	},
	initPreview: function() {
		var $code = this.$el.find('.code');
		this.pv = new PreviewView({ el: $code });
	},
	validSwitch: function() {
		var $el = $('.css .CodeMirror-code');

		switch (this.lesson) {
			case '1':
				this.cv = new CodeReView({ el: $el,
																	 parent: this, 
																	 property: 'display', 
																	 answers: ['flex;'] });
				break;
			case '2':
				this.cv = new CodeReView({ el: $el,
																	 parent: this, 
																	 property: 'flex-direction', 
																	 answers: ['row;',
																	 				   'column;',
																	 				   'row-reverse;',
																	           'column-reverse;']
																});
				break;
			case '3':
				this.cv = new CodeReView({ el: $el,
																	 parent: this, 
																	 property: 'flex-wrap', 
																	 answers: ['wrap;',
																	 				   'nowrap;',
																	 				   'wrap-reverse;']
																});
				break;
			case '4':
				this.cv = new CodeReView({ el: $el,
																	 parent: this, 
																	 property: 'justify-content', 
																	 answers: ['space-between;',
																	 					 'space-around;',
																	 					 'flex-start;',
																	 				   'flex-end;',
																	 				   'center;']
															  });
				break;
			case '5':
				this.cv = new CodeReView({ el: $el,
																	 parent: this,
																	 property: 'align-items',
																	 answers: ['flex-start;',
																	           'flex-end;',
																	           'baseline;',
																	           'stretch;',
																	           'center;']
																});
				break;
			case '6':
				this.cv = new CodeReView({ el: $el,
																	 parent: this,
																	 property: 'order',
																	 answers: ['1;', 
																	           '2;']
																});
				break;
			case '7':
				this.cv = new CodeReView({ el: $el,
																	 parent: this,
																	 property: 'flex-grow',
																	 answers: ['1;',
																	           '2;']
																});
				break;
			case '8':
				this.cv = new CodeReView({ el: $el,
																	 parent: this,
																	 property: 'flex-shrink',
																	 answers: ['1;',
																	 					 '2;',
																	 					 '3;',
																	 					 '4;',
																	 					 '5;',
																	 					 '6;',
																	 					 '7;',
																	 					 '8;']
																})

				break;
			default:
				// default
		}
	},
	destroy: function() {
		if ( this.pv ) { this.pv.destroy(); }
		if ( this.cv ) { this.cv.destroy(); }
	}
});

return LessonView;

});