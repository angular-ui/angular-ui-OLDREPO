/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
angular.module('ui.filters').filter('highlight', function () {
    return function (text, search, caseSensitive, capture) {
        if (search || angular.isNumber(search)) {
            var start = '<span class="ui-match">',
                end = '</span>',
                result,
                reg,
                match;
            try{
                text = text.toString();
                search = search.toString();
                if (caseSensitive && !capture) {
                    result = text.split(search).join(start + search + end);
                } else {
                    reg = new RegExp(search, caseSensitive && 'g' || 'gi');
                    match = reg.exec(text);
                    result = text.replace(reg, start + (capture && '$1' || '$&') + end);
                    if(capture && match[0] != match[1]) {
                        result = text.substring(0, reg.lastIndex - match[1].length) + result;
                    }
                }
                return result;
            } catch (Exception) {
                return text;
            }
        } else {
            return text;
        }
    };
});