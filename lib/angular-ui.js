
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */

angular.module('ui.directives', []).directive('uiLinky', [function() {
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
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset
 */

angular.module('ui.directives', []).directive('uiScrollfix', [function() {
  return function(scope, elm, attrs) {
    if (!attrs.jvScrollfix) {
      attrs.jvScrollfix = elm.offset().top;
    }
    $(window).scroll(function(){
      if (!elm.hasClass('fixed') && window.pageYOffset > attrs.jvScrollfix) {
        elm.addClass('fixed');
      } else if (elm.hasClass('fixed') && window.pageYOffset < attrs.jvScrollfix) {
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
 * Adds a 'show' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives', []).directive('uiShow', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiShow)) {
			elm.addClass('show');
		} else {
			elm.removeClass('show');
		}
	};
}]);

/**
 * uiHide Directive
 *
 * Adds a 'hide' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives', []).directive('uiHide', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiShow)) {
			elm.addClass('hide');
		} else {
			elm.removeClass('hide');
		}
	};
}]);

/**
 * uiToggle Directive
 *
 * Adds a class 'show' if true, and a 'hide' if false to the element instead of display:block/display:none
 * Created to allow tighter control  of CSS without bulkier directives. This also allows you to override the
 * default visibility of the element using either class.
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives', []).directive('uiToggle', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiShow)) {
			elm.switchClass('show', 'hide');
		} else {
			elm.removeClass('hide', 'show');
		}
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */
 
angular.module('ui.filters', []).filter('highlight', function() {

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
 * @module ui
 * Bind Angular.js modules
 */

angular.module('ui', [
  'ui.filters', 
  'ui.directives'
]);
