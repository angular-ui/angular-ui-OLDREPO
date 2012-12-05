/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 * @param [capture] {boolean} optional boolean to use a regular expression capture for highlighting
 */
angular.module('ui.filters').filter('highlight', function () {
    return function (text, search, caseSensitive, capture) {
        if(!capture) {
            if (search || angular.isNumber(search)) {
                text = text.toString();
                search = search.toString();
                if (caseSensitive) {
                    return text.split(search).join('<span class="ui-match">' + search + '</span>');
                } else {
                    return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
                }
            } else {
                return text;
            }
        } else {
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
        }
    };
});
