/**
 * uiDebounce service provides a mechanism for creating a wrapper around a function 
 * that ensures that the wrapped function is not called more frequently than a
 * given time interval.
 *
 * @param {!Function} func The function to be wrapped (debounced)
 * @param {number} wait How long between called to func
 * @param {Boolean} immediate If true then the function is invoked on the first call to the
 * wrapper function, otherwise the call will not happen until after the wait time has expired
 * @return {Function} A debounced wrapper around the func function.
 *
 * @example
 * function lookup(id) { ... lookup something ... }
 * var debounceLookup = debounce(lookup, 2000, false);
 * $scope.doLookup = function(msg) {
 *   var promise = debounceLookup(msg);
 *   console.log('called lookup: ', promise);
 *   promise.then(function(value) {
 *     console.log('lookup returned:', value);
 *   });
 * };
 */
angular.module('ui.services').factory('uiDebounce', function($timeout, $q) {
  return function(func, wait, immediate) {
    var timeout;
    var deferred = $q.defer();
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };
      var callNow = immediate && !timeout;
      if ( timeout ) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        deferred.resolve(func.apply(context,args));
        deferred = $q.defer();
      }
      return deferred.promise;
    };
  };
});
