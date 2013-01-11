/**
 * getRemote Directive
 *
 * Loads remote data in current scope
 * Useful to allow selects to load options from APIs, for example.
 *
 * @param expression {string} evaluated expression to determine path to data and variable name in scope
 */
angular.module('ui.directives').directive('getRemote', function ($http) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var pars = $attrs.getRemote.toLowerCase().split(' as ');
        $http.get(pars[0]).success(function (data) {
          $scope[pars[1]] = data;
        });
      }
    };
});