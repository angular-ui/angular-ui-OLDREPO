/*
* Filter/directive templates
*/
angular.module('ui.filters')
  .filter('filterTmpl', ['ui.config', function(uiConfig) { 
    var config = { 'somefilteropt' : 'foo'};
    if (uiConfig.filterTmpl) {
      angular.extend(config, uiConfig.filterTmpl); 
    }
    return function (value, kind) {
      var opts = {}, inputs = {}, out;
      // if an input is given then override
      if(kind) {
        inputs = {'kind' : kind };
      }
      angular.extend(opts, config, inputs);
      //
      // do something more interesting to input value here
      //
      out = value;
      return out;
    };
  }]);

angular.module('ui.directives')
  .directive('uiDirectiveTmpl', ['ui.config', function(uiConfig) {
    var config = { 'somedirectiveopt' : 'bar' };
    if (uiConfig.directiveTmpl) {
      angular.extend(config, uiConfig.directiveTmpl); 
    }
    return {
      restrict: 'EAC', // supports using directive as element, attribute and class
      require: 'ngModel', // requires ng-model controller so we get the two-way binding  
      link: function(scope, element, attrs, ngModel) {
        var opts = {}; // instance-specific options

        // build up our options
        angular.extend(opts, config, scope.$eval(attrs.uiTmpl)); // element attributes that override default options

        // override the controllers render function and do something interesting in here
        ngModel.$render = function() {
          element.text(ngModel.$viewValue); // boring
        };
      }
    };
  }]);
