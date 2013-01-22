/**
 * Add a clear button to form inputs to reset their value
 */
angular.module('ui.directives').directive('uiRoute', ['ui.config', '$location', function (uiConfig, $location) {
  if (uiConfig.route !== undefined)
    routeClass = uiConfig.route;
  else
    routeClass = 'ui-active';
  return {
    link: function ($scope, elm, attrs) {
      var watcher;
      function checkRoute() {
        var regexp = new RegExp('^' + watcher + '$', ["i"]);
        elm.toggleClass(routeClass, regexp.test($location.path()));
      }
      attrs.$observe('uiRoute', function(newVal) {
        watcher = newVal;
        checkRoute();
      });
      $scope.$on('$routeChangeSuccess', function(){
        checkRoute();
      });
    }
  };
}]);
