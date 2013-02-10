/*global angular */
/*
 jQuery UI Autocomplete plugin wrapper
 @author Anatoly Mironov
 http://sharepointkunskap.wordpress.com, http://www.bool.se

 @param [ui-autocomplete] {object} Options to pass to $.fn.autocomplete() 
 */

angular.module('ui.directives')

.directive('uiAutocomplete', [function() {
  var directive = {
		require: '?ngModel',
		link: function(scope, element, attrs, controller) {
			var getOptions = function() {
				return angular.extend({}, scope.$eval(attrs.uiAutocomplete));
			};
			var initAutocompleteWidget = function () {
				var opts = getOptions();
				element.autocomplete(opts);
				if (opts._renderItem) {
					element.data("autocomplete")._renderItem = opts._renderItem;
				}
			};
			// Watch for changes to the directives options
			scope.$watch(getOptions, initAutocompleteWidget, true);
		}
	};
  return directive;
}]);
