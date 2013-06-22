/*
Test HTML


      <section id="directives-input">
        <div class="page-header">
          <h1>Input</h1>
        </div>
        <div class="well">
          <script type="text/ng-template" id="input">
            <pre>{{$input.model|json}}</pre>
            <input ng-transclude id="{{$input.id}}">
            <label for="{{$input.id}}">{{$input.label}}</label>
          </script>
          <pre>Model: {{input|json}}</pre>
          <ui-input src="'input'" label="Input" required ng-model="$parent.input"></ui-input>
        </div>
      </section>

 */
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
        id:tAttrs.id || 'id' + nextUid(idUid)
      };

      return function (scope, element, attrs) {

        scope.$watch(attrs.src, function(newVal, oldVal) {
          if (!newVal)
            return;
          $http.get(newVal, {cache:$templateCache}).success(function (response) {

            element.html(response);

            var inputEl = element.find('[ng-transclude]');
            angular.forEach(tAttrs, function (value, key) {
              if (key.charAt(0) !== '$' && ['src','uiInput', 'id'].indexOf(key) === -1) {
                inputEl.attr(snake_case(key, '-'), value);
                input[key] = value;
              }
            });
            inputEl.removeAttr('ng-transclude');

            //prepare validation messages
            input.validation = angular.extend({}, uiConfig.input.validation, scope.$eval(tAttrs.validation));

            //expose model to a field's template
            scope.$input = input;
            $compile(element.contents())(scope);
            scope.$field = inputEl.controller('ngModel');
          });
        });
      };
    }
  };
}]);