/**
 * Add a clear button to form inputs to reset their value
 */
angular.module('ui.directives').directive('uiReset', ['$parse', function ($parse) {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var opts, aElement;
      opts = {};
      if (attrs.uiReset) {
        opts = scope.$eval(attrs.uiReset);
        if (angular.isString(opts)) {
          opts = {resetValue: opts};
        }
      }
      opts = angular.extend({resetValue: null}, opts);
      aElement = angular.element('<a class="ui-reset" />');
      elm.wrap('<span class="ui-resetwrap" />').after(aElement);
      aElement.bind('click', function (e) {
        e.preventDefault();
        scope.$apply(function () {
          // This lets you SET the value of the 'parsed' model
          ctrl.$setViewValue(opts.resetValue);
          ctrl.$render();
        });
      });
    }
  };
}]);
