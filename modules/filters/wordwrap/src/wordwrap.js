/* 
 * Wordwrap
 * Takes a string and splits it into an array every given number of chars
 * If join is specified, will join all the chars with it.
 * @param input, a string to wordwrap
 * @param width, number of chars to wrap it with
 * @param [optional] joinWith, string to join the split chars
 * @example 'abc' | wordwrap:2 -> ['ab','c']; 
 * @example 'john' | wordwrap:3:'\n' -> 'joh\n'
 */
angular.module('ui.filters').filter('wordwrap', function() {
  return function wordwrap(input, width, joinWith) {
    var i, result, len;
    width = +width || 75;
    i = 0;
    result = [];
    len = input.length / width;
    
    for (; i<len; i++) {
      result.push(input.substr(i*width, width));
    }
    if (joinWith)  {
      result = result.join(joinWith);
    }

    return result;
  }
});