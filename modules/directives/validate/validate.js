/**
 * General-purpose validator for ngModel.
 * angular.js comes with several built-in validation mechanism for input fields (ngRequired, ngPattern etc.) but using
 * an arbitrary validation function requires creation of a custom formatters and / or parsers.
 * The ui-validate directive makes it easy to use any function defined in scope as a validator function. The validator
 * function will trigger validation on both model and input changes.
 *
 * @example <input ui-validate="myValidatorFunction">
 *
 * @param ui-validate {string} The name of a function to be used as a validator. The function will get a value to be
 * validates as its argument and should return true/false indicating a validation result.
 */
angular.module('ui.directives').directive('uiValidate', function () {

  return {
    restrict:'A',
    require:'ngModel',
    link:function (scope, elm, attrs, ctrl) {

      var validateFn, validateExpr = attrs.uiValidate;
      
      validateExpr = scope.$eval(validateExpr);
      
      if (!validateExpr) {
        return;
      }

      if (angular.isFunction(validateExpr)) {
        validateExpr = { validator: validateExpr };
      }

      angular.forEach(validateExpr, function(validator, key){
        validateFn = function (valueToValidate) {
          if (validateExpr(valueToValidate)) {
            // it is valid
            ctrl.$setValidity(key, true);
            return valueToValidate;
          } else {
            // it is invalid, return undefined (no model update)
            ctrl.$setValidity(key, false);
            return undefined;
          }
        };
        ctrl.$formatters.push(validateFn);
        ctrl.$parsers.push(validateFn);
      });
    }
  }
});