
/**
 * Actually removes html from the DOM instead of hiding it for assistance with 
 * CSS3 selectors such as :first-child, :last-child, etc
 * 
 * NOTE: This solution may not behave perfectly when used with or around other directives that also
 *   manipulate the dom.
 * 
 * @todo Add a more resilient solution to injecting removed elements back into the DOM (instead of relying on nextElm)
 * @param remove {boolean} condition to check if the element should be removed form the DOM
 */

angular.module('ui.directives').directive('uiRemove', [function() {
	return function(scope, elm, attrs) {
		var remove, nextElm;
		scope.$watch(attrs.uiRemove, function(newVal, oldVal) {
			if (newVal) {
				nextElm = elm.next();
				// Checks for jQuery lib usage
				if (elm['detach']) {
					elm.detach();
				} else {
					elm.remove();
				}    
			} else {
				if (nextElm) {
					nextElm.before(elm);
					nextElm = false;            
				}
			}
		});
	};
}]);