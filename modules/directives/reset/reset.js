/**
 * Add a clear button to form inputs to reset their value
 */
angular.module('ui.directives').directive('uiReset', ['ui.config', function (uiConfig) {
  var resetValue = null;
  if (uiConfig.reset !== undefined)
      resetValue = uiConfig.reset;
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var aElement;
      aElement = angular.element('<a class="ui-reset" />');
      elm.wrap('<span class="ui-resetwrap" />').after(aElement);
      aElement.bind('click', function (e) {
        if (attrs.uiReset) {
          resetValue = scope.$eval(attrs.uiReset);
        }
        e.preventDefault();
        scope.$apply(function () {
          ctrl.$setViewValue(resetValue);
          ctrl.$render();
        });
      });
    }
  };
}]);
