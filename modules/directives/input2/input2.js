/*
 * Defines the ui-input2 tag, attribute and class(restrict ECA). This allow an input property to be changed
 */
angular.module('ui.directives').directive('uiInput2', ['$compile', function($compile) {
  return {
    restrict: 'ECA',
    replace: true,
    template: '<span />',
    link: function(scope, iElement, iAttrs, controller) {
      var clone = (function() {
        var cursor = iElement;
        return function(type) {
          var input = angular.element('<input type="' + type + '" />');
          angular.forEach(iAttrs.$attr, function(v,k) {
            if (v != 'type') {
              input.attr(v, iAttrs[k]);
            }
          });
          input.removeAttr('ui-input2');
          cursor.after(input);
          cursor.remove();
          cursor = input;
          return input;
        };
      })();

      clone('text');
      iAttrs.$observe('type', function(type) {
        var input = clone(type || 'text');
        $compile(input)(scope);
      });
    }
  };
}]);
