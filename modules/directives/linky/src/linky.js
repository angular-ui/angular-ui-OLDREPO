
/**
 * Changes the current element from a link to a span tag based on a condition
 * @param expression {boolean} condition to check if it should be a link or not
 */

angular.module('ui.directives.linky').directive('uiLinky', [function() {
	return function(scope, elm, attrs) {	
		var newElm;
		scope.$watch(attrs.uiLinky, function(newVal, oldVal){
			if (newVal) {
				newElm = angular.element('<a>');
				if (attr['ng-click']) {
					newElm.click(function(e){
						if (attr.href === undefined) {
							e.preventDefault();
						}
						scope.$eval(attr['ng-click']);
					});
				}
			} else {
				newElm = angular.element('<span>');
			}     
			delete attrs.href;
			delete attrs['ng-click'];
			delete attrs.uiLinky;
			newElm.attr(attrs);
			elm.replaceWith(newElm);
		});
	};
}]);
