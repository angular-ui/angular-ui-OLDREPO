
/**
 * Actually removes html from the DOM instead of hiding it for assistance with 
 * CSS3 selectors such as :first-child, :last-child, etc
 * 
 * @param remove {boolean} condition to check if the element should be removed form the DOM
 */

angular.module('ui.directives', []).directive('uiRemove', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiRemove)) {
			elm.remove();
		}
	};
}]);