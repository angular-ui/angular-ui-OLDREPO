
/**
 * Extracts properties of an array of objects and returns an array of strings
 *
 * @TODO Make paths go deeper than 1 level
 * @TODO Allow an array for separator param?
 * @param dataset {array[object]} array of objects to extract from
 * @param paths {mixed} the property to retrieve from the objects
 *   string: property name
 *   array[string]: array of property names to be joined by separator in the order passed
 * @param [separator] {string} Optional the string to join multiple properties
 */
angular.module('ui.filters').filter('extract', function(){
  // paths can optionally be an array
  // separator is how to merge those different paths
  return function(value, paths, separator) {
    var result = [],
        newItem;
    if (angular.isArray(value) || angular.isObject(value)) {
      angular.forEach(value, function(item) {
        // if paths is an array
        if (angular.isArray(paths)) {
          newItem = [];
          angular.forEach(paths, function(path){
            newItem.push(item[path]);
          });
          result.push(newItem.join(separator));
        // if paths is a string
        } else {
          result.push(item[paths]);
        }
      });
    } else {
      result = value;
    }
    return result;
  };
});
