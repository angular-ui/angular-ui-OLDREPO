
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset
 */
angular.module('ui.directives').directive('uiScrollfix', [function() {
  return function(scope, elm, attrs) {
    var top = elm.offset().top,
    original = '';
    if (!attrs.uiScrollfix) {
      attrs.uiScrollfix = top;
    } else {
      original = attrs.uiScrollfix;
      if (attrs.uiScrollfix.indexOf('-') === 0) {
        attrs.uiScrollfix = top - attrs.uiScrollfix.substr(1);
      } else if (attrs.uiScrollfix.indexOf('+') === 0) {
        attrs.uiScrollfix = top + parseInt(attrs.uiScrollfix.substr(1));
      }
    }
    $(window).unbind('scroll.ui-scrollfix'+original).bind('scroll.ui-scrollfix'+original, function(){
      if (!elm.hasClass('fixed') && window.pageYOffset > attrs.uiScrollfix) {
        elm.addClass('fixed');
      } else if (elm.hasClass('fixed') && window.pageYOffset < attrs.uiScrollfix) {
        elm.removeClass('fixed');
      }
    });
  };
}]);
