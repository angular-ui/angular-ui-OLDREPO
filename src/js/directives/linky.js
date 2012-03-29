
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
