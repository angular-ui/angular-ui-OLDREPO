angular.module('ui.directives')
.directive('uiModal', ['$timeout', function($timeout) {
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      //helper so you don't have to type class="modal hide"
      elm.addClass('modal hide');
      scope.$watch(attrs.ngModel, function(value) {
        elm.modal(value && 'show' || 'hide');
      });
      elm.on('show.ui', function() {
        $timeout(function() {
          model.$setViewValue(true);
        });
      });
      elm.on('hide.ui', function() {
        $timeout(function() {
          model.$setViewValue(false);
        });
      });
    }
  };
}]);