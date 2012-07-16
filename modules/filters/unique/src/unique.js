
/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
	if the key is empty, the entire object will be compared
	if the key === false then no filtering will be performed
 * @return {array}
 */
angular.module('ui.filters').filter('unique', function() {
	return function(items, key) {
		if (key && angular.isArray(items)) {
			var hashCheck = {},
				newItems = [];
			angular.forEach(items, function(item, key){
				var value;
				if (angular.isString(key)) {
					value = item[key];
				} else {
					value = item;
				}
				if (hashCheck[value] === undefined) {
					hashCheck[value] = true;
					newItems.push(item);
				}
			});
			items = newItems;
		}
		return items;
	};
});
