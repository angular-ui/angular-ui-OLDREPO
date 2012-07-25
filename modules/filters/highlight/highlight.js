
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */
angular.module('ui.filters').filter('highlight', function() {
	return function(text, filter) {
    if (filter === undefined || filter === '') {
			return text;
		} else {
			return text.replace(new RegExp(filter, 'gi'), '<span class="ui-match">$&</span>');
		}
	};
});
