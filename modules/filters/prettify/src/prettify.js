/**
 * Converts variable-esque naming conventions to something presentational, capitalized words separated by space.
 * @param {String} value The value to be parsed and prettified.
 * @return {String}
 * @example {{ 'firstName' | prettify }} => First Name
 *          {{ 'last_name' | prettify }} => Last Name
 *          {{ 'home_phoneNumber' | prettify }} => Home Phone Number
 */
angular.module('ui.filters').
    filter('prettify', function () {
        return function (value) {
            return value
                //replace all _ and spaces and first characters in a word with upper case character
                .replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase();})
                // insert a space between lower & upper
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                // space before last upper in a sequence followed by lower
                .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');
        };
    });
