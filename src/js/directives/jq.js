
/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 * 
 * @TODO Devise a way to pass app-wide defined configuration options. Consider global var. 
 * @param expression {string} The $elm.[pluginName]() to call.
 */

angular.module('ui.directives', []).directive('uiJq', [function() {
	var options = {};
	return function(scope, elm, attrs) {	
		elm[attrs.uiJq](options);
	};
}]);