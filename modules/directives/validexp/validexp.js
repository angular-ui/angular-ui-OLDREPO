/**
 * Validation Expressions with support for watch
 * (might get merged into ui-validate)
 *
 * @author TrevDev
 * @type {String}
 * @example ui-validexp="{ exp:'$value > valA', watch: 'valA' }"
 */
angular.module('ui.directives').directive('uiValidexp', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {

      var myObj = scope.$eval(attrs.uiValidexp);

      var oldValue;
      var validateExpValidator = function (value) {
        oldValue = value;
        if (scope.$eval(myObj.exp, { '$value': value })) {
          ctrl.$setValidity('validexp', true);
          return value;
        } else {
          ctrl.$setValidity('validexp', false);
          return undefined;
        }
      };

      ctrl.$parsers.push(validateExpValidator);
      ctrl.$formatters.push(validateExpValidator);

      if (myObj.watch) {
        scope.$watch(myObj.watch, function () {
          validateExpValidator(oldValue);
        });
      }
    }
  };
});