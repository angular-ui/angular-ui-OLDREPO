
/*
 Gives the ability to style currency based on its sign.
*/
  angular.module('ui.directives').directive('uiCurrency', ['ui.config','currencyFilter' , '$interpolate', function(uiConfig, currencyFilter, $interpolate) {
	  var options = {
	      pos: 'ui-currency-pos',
	      neg: 'ui-currency-neg',
	      zero: 'ui-currency-zero',
        bignum: 0,
        smallnum: 0
  	};
  	if (uiConfig.currency) {
  		angular.extend(options, uiConfig.currency);
  	}
    return { 
      restrict: 'EAC',
      require: '?ngModel',
      link: function(scope, element, attrs, controller) {
        var opts, renderview, value, removeclasses, isnottotal; // instance-specific options

        opts = angular.extend({}, options, scope.$eval(attrs.uiCurrency));
        
        isnottotal = angular.isUndefined(attrs.isTotal);

        // since we're going to possibly add/remove, it's easier just to remove them all first
        element.removeClass(opts.pos);
        element.removeClass(opts.neg);
        element.removeClass(opts.zero);
        element.removeClass('ui-bignum');
        element.removeClass('ui-smallnum');

        renderview = function(viewvalue) {
          var num;
          viewvalue = $.trim(viewvalue);
          if(viewvalue == '') {
            element.text('');
            return;
          }
          num = viewvalue * 1;

          if (num > 0) {
            element.addClass(opts.pos);
            if(isnottotal && opts.bignum && num >= opts.bignum) {
               element.addClass('ui-bignum');
            }
          } else if (num < 0) {
            element.addClass(opts.neg);
            if(isnottotal && opts.smallnum && num <= opts.smallnum) {
               element.addClass('ui-smallnum');
            }
          } else if (num === 0) {
            element.addClass(opts.zero);
          }
          element.text(currencyFilter(num, opts.symbol));
        };
        if (controller != null) {
          controller.$render = function() {
            value = controller.$viewValue;
            element.val(value);
            renderview(value);
          };
        } else {
          var exp;
          exp = $interpolate(element.text());
          value = exp(scope);
          renderview(value);
        }
        
      }
    };
  }]);
