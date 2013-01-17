angular.module('ui.directives')
.directive('uiModal', ['$timeout', function($timeout) {
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      //helper so you don't have to type class="modal hide"
      elm.addClass('modal hide');
      var opts = angular.extend({}, scope.$eval(attrs.uiModal));

      elm.on( 'shown', function() {
        elm.find( "[autofocus]" ).focus();
        if (angular.isFunction(opts.onShown)) {
         opts.onShown();
        }
      });
      elm.on( 'hidden', function() {
        if (angular.isFunction(opts.onHidden)) {
          opts.onHidden();
        }
      });
      scope.$watch(attrs.ngModel, function(value) {
        elm.modal(value && 'show' || 'hide');
      });
      //If bootstrap animations are enabled, listen to 'shown' and 'hidden' events
      elm.on(jQuery.support.transition && 'shown' || 'show', function() {
        $timeout(function() {
          model.$setViewValue(true);
        });
      });
      elm.on(jQuery.support.transition && 'hidden' || 'hide', function() {
        $timeout(function() {
          model.$setViewValue(false);
        });
      });
    }
  };
}]);