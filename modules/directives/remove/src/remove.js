
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
		var parent = elm.parent();
		var expression = attrs.uiRemove;
		elm.data('ui-remove-index', elm.index());
		scope.$watch(expression, function(newValue, oldvalue) {
			var index, children, child;
			if (newValue) {
				elm.detach(); 
			} else if (!$.contains(parent, elm)) {
				index = elm.data('ui-remove-index');
				children = elm.parent().children();
				if (children.length > 0) {
					for (var i = 0; i < children.length; i++) {
						child = children[i];
						if (index > child.index() && i === children.length-1) {
							child.after(elm);
						} else {
							child.before(elm);
						}
					}
				} else {
					parent.append(elm);
				}
			}
		});
	};
}]);