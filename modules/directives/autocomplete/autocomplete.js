/*global angular */
/*
 jQuery UI Autocomplete plugin wrapper
 @author Anatoly Mironov
 http://sharepointkunskap.wordpress.com, http://www.bool.se

 @param [ui-autocomplete] {object} Options to pass to $.fn.autocomplete() 
 */

angular.module('ui.directives')

.directive('uiAutocomplete', ['ui.config', function(uiConfig) {
  var directive = {
		require: '?ngModel',
		link: function(scope, element, attrs, controller) {
			var options = {};
			if (uiConfig.autocomplete) {
				angular.extend(options, uiConfig.autocomplete);
			}
			var initAutocompleteWidget = function () {
				var opts = angular.extend({}, options, scope.$eval(attrs.uiAutocomplete));
				element.autocomplete(opts);
				if (opts._renderItem) {
					element.data("autocomplete")._renderItem = opts._renderItem;
				}
			};
			// Watch for changes to the directives options
			scope.$watch(attrs.uiAutocomplete, initAutocompleteWidget, true);
		}
	};
  return directive;
}]);
