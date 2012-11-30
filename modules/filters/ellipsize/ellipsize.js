/**
 * Ellipsize String
 *
 * This function will strip tags from a string, split it at its max_length and ellipsize
 *
 * @param    string    string to ellipsize
 * @param    int       max length of string
 * @param    mixed     int (1|0) or float, .5, .2, etc for position to split
 * @param    string    ellipsis ; Default '...'
 * @return   string    ellipsized string
 */

angular.module('ui.filters').filter('ellipsize', function () {
	return function (str, max_length, position, ellipsis) {
		
		var beg, end;
		
		// Default values
		position = position ? position : 0.5;
		max_length = max_length ? max_length : 15;
		ellipsis = ellipsis ? ellipsis : '…';
		
		// Is the string long enough to ellipsize?
		if (str.length <= max_length) {
			return str;
		}
		
		beg = str.substr(0, Math.floor(max_length * position));
		position = (position > 1) ? 1 : position;
		
		if (position === 1) {
			end = str.substr(0,  - (max_length - beg.length));
		} else {
			end = str.substr( - (max_length - beg.length));
		}
		
		return beg + ellipsis + end;
		
	};
});