
/**
 * extract - subset array of objects based on conditions 
 *
 * @param array Array or Objects which would be filtered against options
 * @param options Object with definition of query
 *   {fieldName__condition: value}
 *   where 'fieldName' is the name of field in array which would be taken into
 *   account and 'condition' is one of tags:
 *      'lt' - <
 *      'lte' - <=
 *      'gt' - >
 *      'gte' - >=
 *      'eq' - ==
 *      'in'       - checks if value of field is in the given in 'value' list
 *      'startswith' - if value stats with specific characters,
 *      'endswith' - if value ends with specific characters,
 *      'istartswith' - if value stats with specific characters, without
 *                      checking case of characters,
 *      'iendswith' - if value ends with specific characters, without checking
 *                      case of characters,
 *      'contains' check if value contains specific string,
 *      'icontains' the same as above but without checking letter-case,
 *      'range' - check if value is between(inclusive) given range,
 *      'regex' - check if given regex is found on values,

 *  join together multiple conditions by:
 *      'or'|'and' - indicate that value contains the same object with
 *      {fieldName__condition: value} format linked by 'OR'|'AND'.
 *
 * @return array
 *
 */

var CompareObject = {
    "eq": function(a, b){ return a == b; },
    "lt": function(a, b){ return a < b; },
    "gt": function(a, b){ return a > b; },
    "lte": function(a, b){ return a <= b; },
    "gte": function(a, b){ return a >= b; },
    "in": function(a, b){
            if(b.indexOf(a) != -1) {
                return true;
            } else {
                return false;
            }
    },
    'startswith': function(a, b) {
            return CompareObject._with(a, b, 'start');
        },
    'endswith': function(a, b){
            return CompareObject._with(a, b, 'end', 'n');
        },
    'istartswith': function(a, b) {
            return CompareObject._with(a, b, 'start', 'i');
        },
    'iendswith': function(a, b){
            return CompareObject._with(a, b, 'end', 'i');
        },
    'contains': function(a, b) {
            return (a.indexOf(b) !== -1);
        },
    'icontains': function(a, b){
            return (a.toLowerCase().indexOf(b.toLowerCase()) !== -1);
        },
    'range': function(a, b) {
        return (a >= b[0] && a <= b[1]);
        },
    'regex': function(a, b) {
        return b.test(a);
        },
    '_with': function(a, b, direction, letter_case){
        if(b === undefined)
            return false;

        if(letter_case === 'i') {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }

        var aLen = a.length;
        var bLen = b.length;
        if(bLen > aLen)
            return false;

        if(aLen == bLen)
            return (a == b);

        if(direction == 'start') {
            return (a.substr(0, bLen) == b);
        } else {
            return (a.substr(aLen - bLen, bLen) == b) 
        }

    }
}

var CheckCondition = function(data, conditions) {
    var or_condition = null;
    var valid = true;
    angular.forEach(conditions, function(value, key) {
        if(key == 'or') {
            valid = valid || CheckCondition(data, value);
        } else if(key == 'and') {
            valid = valid && CheckCondition(data, value);
        } else {
            var tmp = key.split('__');
            var field = tmp[0];
            var fn = tmp[1];
            if(fn in CompareObject) {
                var cmp_fn = CompareObject[fn];
                valid = valid && cmp_fn(data[field], value);
            }
        }
    });
    return valid;
}

angular.module('ui.filters').filter('extract', function(){
  return function(array, options) {
    if (!array) {
      return array;
    }

    var target = new Array();

    angular.forEach(array, function(item) {
        var isValid = CheckCondition(item, options);
        if(isValid){
            target.push(item);
        }
    })
    
    return target;
  };
});
