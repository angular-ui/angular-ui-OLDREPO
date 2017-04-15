/**
 * Filters out objects that are not equal for the specified (key, value) pairs.
 * @param [obj] { key: value, key: value, ... }
 * if the param is empty, no filtering will be performed
 * @return {array}
 */

angular.module('ui.filters').filter('equal', function () {

    return function(items, obj) {
        if (!angular.isArray(items) || !angular.isObject(obj)) return items;
        if (Object.keys(obj).length == 0) return items;

        var filtered = [];
        angular.forEach(items, function(item) {
            if (!angular.isObject(item)) return;
            for (var key in obj) {
                if (!angular.equals(item[key],obj[key])) return;
            }
            filtered.push(item);
            return;
        });
        return filtered;

    }
});

