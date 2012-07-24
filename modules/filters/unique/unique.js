/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
 if the key is empty, the entire object will be compared
 if the key === false then no filtering will be performed
 * @return {array}
 */
angular.module('ui.filters').filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false || !angular.isArray(items)) {
      return items;
    }

    var newItems = [];
    var extractValueToCompare = function (item) {
      if (angular.isObject(item) && filterOn) {
        return item[filterOn];
      } else {
        return item;
      }
    };

    angular.forEach(items, function (item) {
      var valueToCheck, isDuplicate = false, i=0;

      for (; i < newItems.length; i++) {
        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        newItems.push(item);
      }
    });

    return newItems;
  };
});
