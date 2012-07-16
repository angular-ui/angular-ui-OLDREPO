
/**
 * Returns the length of the filtered object or array
 */
angular.module('ui.filters').filter('length', function() {
  return function(value) {
    var len = 0;
    if (typeof value.length == 'undefined') {
      for (key in value) len++;
      return len;
    }
    return value.length;
  };
});
