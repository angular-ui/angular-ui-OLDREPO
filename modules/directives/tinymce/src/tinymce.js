/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.directives').directive('uiTinymce', ['ui.config', function(uiConfig){
	uiConfig.tinymce = uiConfig.tinymce || {};
	return function(scope, elm, attrs) {
		var expression,
		  options = {
			// Update model on button click
			onchange_callback: function(inst) {
				if (inst.isDirty()) {
					inst.save();
					elm.trigger('change');
				}
			},
			// Update model on keypress
			handle_event_callback: function(e) {
				if (this.isDirty()) {
					this.save();
					elm.trigger('change');
				}
				return true; // Continue handling
			},
			// Update model when calling setContent (such as from the source editor popup)
			setup : function(ed) {
				ed.onSetContent.add(function(ed, o) {
					if (ed.isDirty()) {
						elm.trigger('change');
					}
				});
			}
		};
		if (attrs.uiTinymce) {
			expression = scope.$eval(attrs.uiTinymce);
		} else {
			expression = {};
		}
		angular.extend(options, uiConfig.tinymce, expression);
		setTimeout(function(){
			elm.tinymce(options);
		}, 0);
	};
}]);