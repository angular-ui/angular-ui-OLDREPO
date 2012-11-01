angular.module('ui.directives')
  .directive('uiInput', ['$compile', '$http', '$templateCache', 'ui.config', function ($compile, $http, $templateCache, uiConfig) {

  uiConfig.input = uiConfig.input || {};

  var idUid = ['0', '0', '0'];
  var nameUid = ['0', '0', '0'];

  /*
   Copyright (c) 2010-2012 Google, Inc. http://angularjs.org
   This function is slightly modified version of the nextUid() function found in AngularJS code base
   */
  function nextUid(uid) {
    var index = uid.length;
    var digit;

    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57 /*'9'*/) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit == 90  /*'Z'*/) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  }

  /*
   Copyright (c) 2010-2012 Google, Inc. http://angularjs.org
   This function is slightly modified version of the snake_case() function found in AngularJS code base
   */
  function snake_case(name, separator) {
    return name.replace(/[A-Z]/g, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  return {
    restrict:'EA',
    priority:10000,
    terminal:true,
    scope:true,
    require:'?uiForm',
    compile:function compile(tElement, tAttrs, transclude, uiForm) {

      var model = tAttrs.ngModel, input = {
        id:tAttrs.id || 'input' + nextUid(idUid)
      };

      return function (scope, element, attrs) {

        //infer a field type from template's tag name (can be one of ui-input, ui-select, ui-textarea)
        $http.get(scope.$eval(attrs.src), {cache:$templateCache}).success(function (response) {

          element.html(response);

          var inputEl = element.find('[ng-transclude]');
          angular.forEach(tAttrs, function (value, key) {
            if (key.charAt(0) !== '$' && ['src','uiInput'].indexOf(key) === -1) {
              inputEl.attr(snake_case(key, '-'), value);
            }
          });

          //prepare validation messages
          input.validation = angular.extend({}, uiConfig.input.validation, scope.$eval(tAttrs.validation));

          //expose model to a field's template
          scope.$input = input;
          $compile(element.contents())(scope);
          scope.$field = inputEl.controller('ngModel');
        });
      };
    }
  };
}]);