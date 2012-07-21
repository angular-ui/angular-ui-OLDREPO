
/**
 * Converts variable-esque naming conventions to something presentational, capitalized words separated by space.
 * @param {String} value The value to be parsed and prettified.
 * @param {String} [inflector] The inflector to use. Default: humanize.
 * @return {String}
 * @example {{ 'Here Is my_phoneNumber' | inflector:'humanize' }} => Here Is My Phone Number
 *          {{ 'Here Is my_phoneNumber' | inflector:'underscore' }} => here_is_my_phone_number
 *          {{ 'Here Is my_phoneNumber' | inflector:'variable' }} => hereIsMyPhoneNumber
 */ 
angular.module('ui.filters').filter('inflector', function () {
    
    var inflectors = {
        humanize: function(value) {
            return value
            //replace all _ and spaces and first characters in a word with upper case character
            .replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase();})
            // insert a space between lower & upper
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            // space before last upper in a sequence followed by lower
            .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');
        },
        underscore: function(value) {
            // TODO
            return value;
        },
        variable: function(value) {
            // TODO
            return value;
        }
    };
    
    return function (text, inflector) {
        inflector = inflector || 'humanize';
        return inflectors[inflector](text);
    };
});
