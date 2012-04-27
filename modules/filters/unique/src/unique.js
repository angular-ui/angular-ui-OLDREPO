
/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param key {string} the name of the attribute of each object to compare for uniqueness
 * @return {array}
 */
angular.module('ui.filters').filter('unique', function() {
	return function(items, key) {
		if (key) {
			var hashCheck = {};
			for (i in items) {
				var value = items[i][key];
				if (typeof(hashCheck[value]) !== 'undefined') {
					delete items[i];
				} else {
					hashCheck[value] = true;
				}
			}
		} else {
			var o = {},
				i, 
				l = items.length, 
				r = [];
			for (i=0; i<l;i+=1) {
				o[items[i]] = items[i];
			}
			for (i in o) {
				r.push(o[i]);
			}
			items = r;
		}
		return items;
	};

});