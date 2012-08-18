'use strict';

angular.module('ui.directives')
  .directive('uiDropdownToggle', ['ui.config', '$document', '$location', '$window',
                                     function (uiConfig, $document,  $location,   $window) {
    
    var options = { }, openElement = null, close;
    if (uiConfig.dropdownToggle) {
      angular.extend(options, uiConfig.dropdownToggle);
    } 
    return {
      restrict: 'C',
      link: function(scope, element, attrs) {

        scope.$watch(function(){return $location.path();}, function() {
          close && close();
        });

        element.parent().bind('click', function(event) {
          close && close();
        });

        element.bind('click', function(event) {
          event.preventDefault();
          event.stopPropagation();

          var iWasOpen = false;

          // Initially, openElement will not have been defined, this code will not execute
          if (openElement) {
            iWasOpen = openElement === element;
            close();
          }

          if (!iWasOpen){
            element.parent().addClass('open');
            openElement = element;

            close = function (event) {
              event && event.preventDefault();
              event && event.stopPropagation();
              $document.unbind('click', close);
              element.parent().removeClass('open');
              close = null;
              openElement = null;
            }

            $document.bind('click', close);
          }
        });
      }
    };
  }]);