
/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 * 
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 * 
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 * 		Multiple parameters can be separated by commas
 * 
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter">
 */
angular.module('ui.directives').directive('uiJq', ['ui.config', function(uiConfig) {
	var options = {};
	return {
		link: {
			post: function(scope, elm, attrs) {
				var evalOptions;
				if (uiConfig['jq'] && uiConfig['jq'][attrs.uiJq]) {
					if (angular.isObject(options) && angular.isObject(uiConfig['jq'][attrs.uiJq])) {
						angular.extend(options, uiConfig['jq'][attrs.uiJq]);
					} else {
						options = uiConfig['jq'][attrs.uiJq];
					}
				}
				if (attrs.uiOptions) {
					evalOptions = scope.$eval('['+attrs.uiOptions+']');
					if (angular.isObject(options) && angular.isObject(evalOptions[0])) {
						evalOptions[0] = angular.extend(options, evalOptions[0]);
					}
				}
				elm[attrs.uiJq].apply(elm, evalOptions);
			}
		}
	};
}]);
