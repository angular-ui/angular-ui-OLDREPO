angular.module('ui.directives', ['ui.config'])
  .factory('InputHelper', ['$compile', '$http', '$templateCache', 'ui.config', function ($compile, $http, $templateCache, uiConfig) {

  uiConfig.uiinput = uiConfig.uiinput || {};

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

  var internalAttrs = ['family', 'kind', 'validation'];

  return {
    restrict:'E',
    priority:10000,
    terminal:true,
    compile:function compile(tElement, tAttrs, transclude) {

      var control = {
        id:tAttrs.id || 'id' + nextUid(idUid)
      };

      return function (scope, element, attrs) {

        var childScope = scope.$new();
        var tplFamily = tAttrs.family || uiConfig.uiinput.family;
        var tplKind = tAttrs.kind || uiConfig.uiinput.kind;

        //infer a field type from template's tag name (can be one of ui-input, ui-select, ui-textarea)
        var targetTagName = tElement[0].tagName.substring(3).toLowerCase();

        $http.get(targetTagName + '.' + tplFamily + '.' + tplKind + '.html', {cache:$templateCache}).success(function (response) {

          element.html(response);

          var inputEl = angular.element(element.find(targetTagName)[0]);
          angular.forEach(tAttrs, function (value, key) {
            if (key.charAt(0) !== '$') {
              if (key.indexOf('input') === 0) {
                control[key.charAt(5).toLowerCase() + key.substr(6)] = value;
              } else {
                inputEl.attr(snake_case(key, '-'), value);
              }
            }
          });

          //prepare validation messages
          control.validation = angular.extend({}, uiConfig.uiinput.validation, scope.$eval(tAttrs.validation));

          //expose model to a field's template
          childScope.$control = control;
          $compile(element.contents())(childScope);
          childScope.$field = inputEl.controller('ngModel');
        });
      };
    }
  };
}])
  .directive('uiInput', ['InputHelper', function (InputHelper) {
  return InputHelper;
}])
  .directive('uiTextarea', ['InputHelper', function (InputHelper) {
  return InputHelper;
}])
  .directive('uiSelect', ['InputHelper', function (InputHelper) {
  return InputHelper;
}]);