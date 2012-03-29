
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset
 */

angular.module('ui.directives').directive('uiScrollfix', [function() {
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
