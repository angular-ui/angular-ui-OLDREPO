angular.module('ui.directives')
.directive('uiModal', ['$timeout', function($timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
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