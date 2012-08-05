
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
            // replace all _ and spaces and first characters in a word with upper case character
            .replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase();})
            // insert a space between lower & upper
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            // space before last upper in a sequence followed by lower
            .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');
        },
        underscore: function(value) {
            return value
            // replace all _ and spaces and first characters in a word with upper case character
            // uppercase is used as a temporary thing so that regex is simple to do underscore replacement later
            .replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase();})
            // insert an underscore between lower & upper
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            // underscore before last upper in a sequence followed by lower
            .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1_$2$3').toLowerCase();
        },
        variable: function(value) {
            // replace all _ and spaces and first characters in a word with upper case character
            value = value.replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase();});   
            // lowercase first letter
            return value.charAt(0).toLowerCase() + value.slice(1)
        }
    };
    
    return function (text, inflector) {
        inflector = inflector || 'humanize';
        // massage text first, since this pertains to all inflectors, in future this may not be case
        // i'm pretty sure that this could be done in fewer replaces with a complex regex. At least this is readable
        // not sure how performant it will be...
        text = text
            // replace multiple underscores with single
            .replace(/_{2,}/g,'_')
            // replace multiple spaces with single space
            .replace(/ {2,}/g,' ')
            // remove spaces before and after underscore 
            .replace(/(_ | _)/g,'_')
            // trim leading/trailing underscores/spaces, if any
            .replace(/(^_|_$|^ | $)/,'');

        return inflectors[inflector](text).replace(/_$/,''); // for complex case, need to look for trailing underscore
    };
});
