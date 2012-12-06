/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 * @param [capture] {boolean} optional boolean to use a regular expression capture for highlighting
 */
angular.module('ui.filters').filter('highlight', function () {
    return function (text, search, caseSensitive, capture) {
        if (search || angular.isNumber(search)) {
            text = text.toString();
            search = search.toString();
            try {
                return text.replace(new RegExp(search, caseSensitive && 'g' || 'gi'), '<span class="ui-match">' + (capture && '$1'|| '$&') + '</span>');
            }
            catch (Exception) {
                return text.toString();
            }
        } else {
            return text;
        }
    };
});
