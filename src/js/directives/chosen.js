
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [ajaxHandler] {function} optional handler function for using Ajax-Chosen
 * @link http://harvesthq.github.com/chosen/
 * @link https://github.com/harvesthq/chosen/
 * @link https://github.com/jobvite/ajax-chosen/
 */

angular.module('ui.directives').directive('uiChosen', [function() {
	
	var options = {
		
	}, ajaxOptions = {
			minLength: 3,
			queryLimit: 10,
			delay: 100,
			chosenOptions: options,
			searchingText: "Searching...",
			noresultsText: "No results.",
			initialQuery: false
	};
	return function(scope, elm, attrs) {
		var handler = scope.$eval(attrs.uiChosen);
		if (angular.isFunction(handler)) {
			elm.ajaxChosen(ajaxOptions, handler);
		} else {
			elm.chosen(options);
		}
	};
}]);
