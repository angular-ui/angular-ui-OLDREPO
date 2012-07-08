angular.module('ui.directives')
.directive('uiModal', ['$timeout', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      scope.$watch(attrs.ngModel, function(value) {
          elm.modal(value && 'show' || 'hide');
      });
      elm.on('show.ui', function() {
        model.$setViewValue(true);
        if (!scope.$$phase) scope.$apply();
      });
      elm.on('hide.ui', function() {
        model.$setViewValue(false);
        if (!scope.$$phase) scope.$apply();
      });
    }
  };
}]);