
/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param key {string} the name of the attribute of each object to compare for uniqueness
 * @return {array}
 */

angular.module('ui.filters.unique',[]).filter('unique', function() {

	return function(items, key) {
		var hashCheck = {};
		for (i in items) {
			var value = items[i][key];
			if (typeof(hashCheck[value]) !== 'undefined') {
				delete items[i];
			} else {
				hashCheck[value] = true;
			}
		}
		return items;
	};

});