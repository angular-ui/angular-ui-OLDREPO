
/**
 * @module ui
 * Bind Angular.js modules
 */

angular.module('ui.filters',[]);
angular.module('ui.directives',[]);
angular.module('ui', [
  'ui.filters', 
  'ui.directives'
]);

/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [ajaxHandler] {function} optional handler function for using Ajax-Chosen
 * @link http://harvesthq.github.com/chosen/
 * @link https://github.com/harvesthq/chosen/
 * @link https://github.com/jobvite/ajax-chosen/
 */

angular.module('ui.directives').directive('uiChosen', [function() {
	
	var options = {
		
	}, ajaxOptions = {
			minLength: 3,
			queryLimit: 10,
			delay: 100,
			chosenOptions: options,
			searchingText: "Searching...",
			noresultsText: "No results.",
			initialQuery: false
	};
	return function(scope, elm, attrs) {
		var handler = scope.$eval(attrs.uiChosen);
		if (angular.isFunction(handler)) {
			elm.ajaxChosen(ajaxOptions, handler);
		} else {
			elm.chosen(options);
		}
	};
}]);

/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 * 
 * @TODO Devise a way to pass app-wide defined configuration options. Consider global var. 
 * @param [ui-jq] {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 */

angular.module('ui.directives').directive('uiJq', [function() {
	return function(scope, elm, attrs) {
		if (attrs.uiOptions) {
			elm[attrs.uiJq](scope.$eval(attrs.uiOptions));
		} else {
			elm[attrs.uiJq]();
		}
	};
}]);

/**
 * Bind an event to the 'return' keypress
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

angular.module('ui.directives').directive('uiKeypress', [function(){
	return function(scope, elm, attrs) {
		var params = scope.$eval( '[' + attrs.uiKeypress + ']' );
		params[1] = params[1] || angular.noop();
		elm.bind('keypress', function(event){
			if (event.keyCode == params[0]){
				params[1](event);
				scope.$apply();
			}
		});
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */

angular.module('ui.directives').directive('uiLinky', [function() {
  return function(scope, elm, attrs) {
    var newElm, isLink = scope.$eval(attrs.uiLinky);
    if (isLink) {
      newElm = angular.element('<a>');
      if (attr['ng-click']) {
        newElm.click(function(e){
          if (attr.href === undefined) {
            e.preventDefault();
          }
          scope.$eval(attr['ng-click']);
        });
      }
    } else {
      newElm = angular.element('<span>');
    }     
    delete attrs.href;
    delete attrs['ng-click'];
    delete attrs.uiLinky;
    newElm.attr(attrs);
    elm.html(newElm);
  };
}]);

/**
 * Actually removes html from the DOM instead of hiding it for assistance with 
 * CSS3 selectors such as :first-child, :last-child, etc
 * 
 * NOTE: This solution may not behave perfectly when used with or around other directives that also
 *   manipulate the dom.
 * 
 * @todo Add a more resilient solution to injecting removed elements back into the DOM (instead of relying on nextElm)
 * @param remove {boolean} condition to check if the element should be removed form the DOM
 */

angular.module('ui.directives').directive('uiRemove', [function() {
	return function(scope, elm, attrs) {
		var remove, nextElm;
		scope.$watch(attrs.uiRemove, function(newVal, oldVal) {
			if (newVal) {
				nextElm = elm.next();
				// Checks for jQuery lib usage
				if (elm['detach']) {
					elm.detach();
				} else {
					elm.remove();
				}    
			} else {
				if (nextElm) {
					nextElm.before(elm);
					nextElm = false;            
				}
			}
		});
	};
}]);
/**
 * Add a clear button to form inputs to reset their value
 */

angular.module('ui.directives').directive('uiReset', [function() {
	return function(scope, elm, attrs) {
		elm.wrap('<span class="ui-resetwrap" />').after('<a class="ui-reset" />').next().click(function(e){
			e.preventDefault();
			elm.val(null).trigger('change');
			// scope[attrs.ngModel] = null;
			// scope[attrs.ngModelInstant] = null;
			// scope.$apply();
		});
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset
 */

angular.module('ui.directives').directive('uiScrollfix', [function() {
  return function(scope, elm, attrs) {
    if (!attrs.uiScrollfix) {
      attrs.uiScrollfix = elm.offset().top;
    }
    $(window).scroll(function(){
      if (!elm.hasClass('fixed') && window.pageYOffset > attrs.uiScrollfix) {
        elm.addClass('fixed');
      } else if (elm.hasClass('fixed') && window.pageYOffset < attrs.uiScrollfix) {
        elm.removeClass('fixed');
      }
    });
  };
}]);

/**
 * NOTE: Only adds classes, you must add the class definition yourself
 */

/**
 * uiShow Directive
 *
 * Adds a 'ui-show' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives').directive('uiShow', [function() {
	return function(scope, elm, attrs) {
		scope.$watch(attrs.uiShow, function(newVal, oldVal){
			if (newVal) {
				elm.addClass('ui-show');
			} else {
				elm.removeClass('ui-show');
			}	
		});
	};
}]);

/**
 * uiHide Directive
 *
 * Adds a 'ui-hide' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives').directive('uiHide', [function() {
	return function(scope, elm, attrs) {
		scope.$watch(attrs.uiHide, function(newVal, oldVal){
			if (newVal) {
				elm.addClass('ui-hide');
			} else {
				elm.removeClass('ui-hide');
			}
		});
	};
}]);

/**
 * uiToggle Directive
 *
 * Adds a class 'ui-show' if true, and a 'ui-hide' if false to the element instead of display:block/display:none
 * Created to allow tighter control  of CSS without bulkier directives. This also allows you to override the
 * default visibility of the element using either class.
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives').directive('uiToggle', [function() {
	return function(scope, elm, attrs) {
		scope.$watch(attrs.uiToggle, function(newVal, oldVal){
			if (newVal) {
				elm.removeClass('ui-hide').addClass('ui-show');
			} else {
				elm.removeClass('ui-show').addClass('ui-hide');
			}
		});
	};
}]);

/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */
 
angular.module('ui.filters').filter('highlight', function() {

  return function(text, filter) {
    if (filter === undefined) {
      return text;
    } else {
      return text.replace(new RegExp(filter, 'gi'), '<span class="match">$&</span>');
    };
  };

});

/* EOF */
/**
 * Returns the length property of the filtered object
 */
 
angular.module('ui.filters').filter('length', function() {
	return function(value) {
		return value.length;
	};
});
/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param key {string} the name of the attribute of each object to compare for uniqueness
 * @return {array}
 */

angular.module('ui.filters').filter('unique', function() {

	return function(items, key) {
		var hashCheck = {};
		for (i in items) {
			var value = items[i][key];
			if (typeof(hashCheck[value]) !== 'undefined') {
				delete items[i];
			} else {
				hashCheck[value] = true;
			}
		}
		return items;
	};

});