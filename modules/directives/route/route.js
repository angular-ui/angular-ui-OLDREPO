/**
 * Set a $uiRoute boolean to see if the current route matches
 */
angular.module('ui.directives').directive('uiRoute', ['$location', function ($location) {
  return {
    restrict: 'AC',
    compile: function(tElement, tAttrs) {
      var useProperty;
      if (tAttrs.uiRoute) {
        useProperty = 'uiRoute';
      } else if (tAttrs.ngHref) {
        useProperty = 'ngHref';
      } else if (tAttrs.href) {
        useProperty = 'href';
      } else {
        throw new Error('uiRoute missing a route or href property on ' + elm[0]);
      }
      return function ($scope, elm, attrs) {
        var watcher = angular.noop;

        // Used by href and ngHref
        function observeHref(newVal) {
          if ((hash = newVal.indexOf('#')) > -1)
            newVal = newVal.substr(hash + 1);
          watcher = function watchHref() {
            $scope.$uiRoute = ($location.path().indexOf(newVal) > -1);
          };
          watcher();
        }

        switch (useProperty) {
          case 'uiRoute':
            attrs.$observe('uiRoute', function(newVal) {
              if ((hash = newVal.indexOf('#')) > -1)
                newVal = newVal.substr(hash + 1);
              watcher = function watchRegex() {
                var regexp = new RegExp('^' + newVal + '$', ['i']);
                $scope.$uiRoute = regexp.test($location.path());
              };
              watcher();
            });
            break;
          case 'ngHref':
            // Setup watcher() every time ngHref changes
            attrs.$observe('ngHref', observeHref);
            break;
          case 'href':
            // Setup watcher()
            observeHref(attrs.href);
        }

        $scope.$on('$routeChangeSuccess', function(){
          watcher();
        });
      }
    }
  };
}]);