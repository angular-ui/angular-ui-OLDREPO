/*
 Attaches jquery-ui input mask onto input element
 */
angular.module('ui.directives').directive('uiMask', [
  function () {
    return {
      require:'ngModel',
      link:function ($scope, element, attrs, controller) {
        var maskRe;
        function validateValue(value) {
            return maskRe.test(''+value);
        }
        function buildValueValidator(mask) {
            var defs = $.mask.definitions,
                hasPartial = false,
                test = "";
            angular.forEach(mask.split(""), function(c) {
                if(!hasPartial) {
                    if (c !== '?') {
                        if (defs[c]) {
                            test += defs[c];
                        }
                    }
                    else {
                        hasPartial = true;
                    }
                }
            });
            return new RegExp(test);
        }
        /* We override the render method to run the jQuery mask plugin
         */
        controller.$render = function() {
            var value = controller.$viewValue || '',
                mask = $scope.$eval(attrs.uiMask);
            maskRe = buildValueValidator(mask);
            element.val(value);
            element.mask(mask);
        };

        /* Add a parser that extracts the masked value into the model but only if the mask is valid
         */
        controller.$parsers.unshift(function (value) {
            //force use mask value instead of model value,
            //which may be incorrect in some browsers
            value = element.mask();
            var isValid = validateValue(value);
            controller.$setValidity('mask', isValid);
            return isValid ? value : undefined;
        });

        /* When keyup, update the view value
         */
        element.bind('keyup', function () {
          $scope.$apply(function () {
            controller.$setViewValue(element.mask());
          });
        });
      }
    };
  }
]);
