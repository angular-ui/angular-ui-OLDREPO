
/**
 * Adds a 'ui-scrollfix' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset.
 *   Takes 300 (absolute) or -300 or +300 (relative to detected)
 */
angular.module('ui.directives').directive('uiScrollfix', [function() {
	return {
		link: function(scope, elm, attrs) {
			var top = elm.offset().top;
			if (!attrs.uiScrollfix) {
				attrs.uiScrollfix = top;
			} else {
				if (attrs.uiScrollfix.indexOf('-') === 0) {
					attrs.uiScrollfix = top - attrs.uiScrollfix.substr(1);
				} else if (attrs.uiScrollfix.indexOf('+') === 0) {
					attrs.uiScrollfix = top + parseInt(attrs.uiScrollfix.substr(1));
				}
			}
			$(window).bind('scroll.ui-scrollfix', function(){
				if (!elm.hasClass('ui-scrollfix') && window.pageYOffset > attrs.uiScrollfix) {
					elm.addClass('ui-scrollfix');
				} else if (elm.hasClass('ui-scrollfix') && window.pageYOffset < attrs.uiScrollfix) {
					elm.removeClass('ui-scrollfix');
				}
			});
		}
	};
}]);
