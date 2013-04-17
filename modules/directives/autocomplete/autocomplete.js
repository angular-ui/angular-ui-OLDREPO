/*global angular */
/*
jQuery UI Autocomplete plugin wrapper

@param [ui-autocomplete] {object} Options to pass to $.fn.autocomplete() merged onto ui.config
*/

angular.module('ui.directives')

.directive('uiAutocomplete',
  [ 'ui.config',
    function (uiConfig)
    {
      'use strict';
      var options = {};
      if ( angular.isObject(uiConfig.autocomplete) )
      {
        angular.extend(options, uiConfig.autocomplete);
      }
      return {
        require: '?ngModel',
        link: function (scope, element, attrs, controller)
        {

          var initAutocomplete = function ()
          {
            var opts = angular.extend(
              {}, uiConfig.autocomplete, scope.$eval(attrs.uiAutocomplete)
            );

            // If we have a controller (i.e. ngModelController) then wire it up
            if ( controller )
            {
              var updateModel = function () {
                if ( !scope.$$phase )
                {
                  scope.$apply(function () {
                    var query = element.val();
                    controller.$setViewValue(query);
                    element.blur();
                  });
                }
              }
              
              opts.select = updateModel;
              // In case the user changes the text directly in the input box
              element.bind('autocompleteselect', updateModel);
            }
            // Create the new autocomplete widget
            element.autocomplete(opts);
          };
          // Watch for changes to the directives options
          scope.$watch(attrs.icAutocomplete, initAutocomplete, true);
        }
      };
    }
  ]
);

