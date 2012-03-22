
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
