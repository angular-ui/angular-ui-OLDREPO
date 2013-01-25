/**
 * Set a $activeRoute boolean to see if the current route matches
 */
angular.module('ui.directives').directive('uiRoute', ['$location', function ($location) {
  return {
    restrict: 'AC',
    priority: 100, // must occur before attrs.ngHref is removed
    link: function ($scope, elm, attrs) {
      var watcher = angular.noop;

      // Used by href and ngHref
      function observeHref(newVal) {
        watcher = function watchHref() {
          $scope.$routeActive = ($location.path().indexOf(newVal) > -1);
        };
        watcher();
      }

      if (attrs.uiRoute) {
        attrs.$observe('uiRoute', function(newVal) {
          watcher = function watchRegex() {
            var regexp = new RegExp('^' + newVal + '$', ['i']);
            $scope.$routeActive = regexp.test($location.path());
          };
          watcher();
        });
      } else if (attrs.ngHref) {
        // Setup watcher() every time ngHref changes
        attrs.$observe('ngHref', observeHref);
      } else if (attrs.href) {
        // Setup watcher()
        observeHref(attrs.href);
      } else {
        throw new Error('uiRoute missing a route or href property on ' + elm[0]);
      }

      $scope.$on('$routeChangeSuccess', function(){
        watcher();
      });
    }
  };
}]);
