
/**
 * Returns the length property of the filtered object
 */
 
angular.module('ui.filters.length',[]).filter('length', function() {
	return function(value) {
		return value.length;
	};
});