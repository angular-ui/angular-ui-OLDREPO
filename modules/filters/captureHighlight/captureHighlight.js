/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
angular.module('ui.filters').filter('captureHighlight', function () {
    return function (text, search, caseSensitive) {
        try {
            if (search || angular.isNumber(search)) {
                text = text.toString();
                search = search.toString();
                var match;
                if (caseSensitive) {
                    match = new RegExp(search, 'g').exec(text);
                } else {
                    match = new RegExp(search, 'gi').exec(text);
                }
                var firstPart = text.substr(0, text.indexOf(match[1]));
                var secondPart = '<span class="ui-match">' + match[1] + '</span>';
                var lastPart = text.substr(text.indexOf(match[1]) + match[1].length, text.length);

                return firstPart + secondPart + lastPart;

            } else {
                return text;
            }
        } catch (Exception){
            return text.toString();
        }
    };
});