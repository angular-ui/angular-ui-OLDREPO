/*
 Attaches jquery-ui input mask onto input element
   @param [ui-mask] {object} Options available: 
   - mask: set the mask of the object
   - removeMask: true or false, if false the model will retain the mask as it was typed by the user.
 */
angular.module('ui.directives').directive('uiMask', ['ui.config',
  function (uiConfig) {
    return {
      require:'ngModel',
      link:function ($scope, element, attrs, controller) {
        //get options
        var options = angular.extend({}, uiConfig.mask, $scope.$eval(attrs.uiMask));
        
        /* We override the render method to run the jQuery mask plugin
         */
        controller.$render = function () {
          var value = controller.$viewValue || '';
          element.val(value);
          //If a mask parameter was set as object, parse its value
          if (options["mask"] != undefined) {
              //Check if it is starting as a "'" and add it, since it is required by Jquery
              if (options["mask"].indexOf("'") != 0){
                  options["mask"] = "'" + options["mask"] + "'";
              }
              element.mask($scope.$eval(options.mask));
          } else {
              element.mask($scope.$eval(attrs.uiMask));
          }
        };

        /* Add a parser that extracts the masked value into the model but only if the mask is valid
         */
        controller.$parsers.push(function (value) {
          //the second check (or) is only needed due to the fact that element.isMaskValid() will keep returning undefined
          //until there was at least one key event
          var isValid = element.isMaskValid() || angular.isUndefined(element.isMaskValid()) && element.val().length>0;
          controller.$setValidity('mask', isValid);
          return isValid ? value : undefined;
        });

        /* When changed, update the view value but only if it is not been used with the directive uiDate
           uiDate will parse as a date so it is better format for dates, instead of string.
        */
        if ((attrs["uiDate"] == undefined) && (attrs["uiDateFormat"] == undefined)) {
            element.bind('change', function () {
                $scope.$apply(function () {
                    if ((options["removeMask"] != undefined) && (options["removeMask"] == false)) {
                        controller.$setViewValue(element.val());
                    } else {
                        controller.$setViewValue(element.mask());
                    }
                });
            });
        }
      }
    };
  }
]);
