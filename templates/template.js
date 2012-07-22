/*
* Filter/directive templates
*/
angular.module('ui.filters')
  .filter('tmpl', ['ui.config', function(uiConfig) { // tmplFilter is a boilerplate setup for your coding pleasure
    var config = { };
    if (uiConfig.tmplFilter) {
      angular.extend(config, uiConfig.tmplFilter); 
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
  }])
  .filter('wrap', ['ui.config', function(uiConfig) { // wrapFilter is a simple filter that wraps the incoming value, but only if value has a value.
  	var config = { };
  	if (uiConfig.wrapFilter) {
  		angular.extend(config, uiConfig.wrapFilter); 
  	}
    return function (value, prefix, suffix) {
    	var opts = {}, inputs = {};
      // if an input is given then override
      if(prefix) {
        inputs = {'prefix' : prefix, 'suffix' : suffix};
      }
      // build up our options
      angular.extend(opts, config, inputs);
      if(!value || value == '') {
    		return '';
    	}

    	if(opts.prefix) {
    		return opts.prefix + value + (opts.suffix || '');
    	}
      return value;
    };
  }]);

angular.module('ui.directives')
  .directive('uiTmpl', ['ui.config', function(uiConfig) {
    var config = { };
    if (uiConfig.tmpl) {
      angular.extend(config, uiConfig.tmpl); 
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
  }])
  .directive('uiStylize', ['ui.config', function(uiConfig) { // uiStylize sets style based on if value is alpha or numeric
    var config = { };
    if (uiConfig.stylize) {
      angular.extend(config, uiConfig.stylize); 
    }
    return {
      restrict: 'EAC', // supports using directive as element, attribute and class
      require: 'ngModel', // requires ng-model controller so we get the two-way binding  
      link: function(scope, element, attrs, ngModel) {
        var opts = {}; // instance-specific options

        // build up our options
        angular.extend(opts, config, scope.$eval(attrs.uiStylize)); // element attributes that override default options

        // override the controllers render function and do something interesting in here
        ngModel.$render = function() {
          var numval;
          try {
            // a different approach would be to use a regex, however this might be faster
            numval = parseFloat(ngModel.$viewValue);
            // javascript will parse a number with characters and come up with a number
            // make sure that the result is the same as what was in model
            if(numval != ngModel.$viewValue) {
              numval = null;
            }
          } catch(err) {
            // don't do anything numval will be undefined
          }
          if(numval) {
            element.addClass("ui-numeric");
          } else {
            element.addClass("ui-alpha"); 
          }
          element.text(ngModel.$viewValue); // boring
        };
      }
    };
  }]);