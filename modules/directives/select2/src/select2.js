
/**
 * Enhanced Select2 Dropmenus
 *
 * @concerns When the plugin loads, it injects an extra DIV into the DOM below itself. This disrupts the
 *   compiler, breaking everything below. Because of this, it must be initialized asynchronously (late).
 *   Since the ng:model and ng:options/ng:repeat can be populated by AJAX, they must be monitored in order
 *   to refresh the plugin so that it reflects the selected value
 * @AJAX Multiselect - For these, you must use an <input>. The values will NOT be in the form of an Array,
 *   but a comma-separated list. You must adjust the value as needed before using accordingly
 * @params [options] {object} The configuration options passed to $().select2(). Refer to the documentation
 *   - [watch] {string} an expression to monitor for changes. For use with ng:repeat populated via ajax
 *   - [ajax.initial] {function(url, values, multiple)} a callback function that returns the query string
 *   		to retrieve initial information about preselected/default values
 */
angular.module('ui.directives').directive('uiSelect2', ['ui.config', '$http', function(uiConfig, $http){
	var options = {};
	if (uiConfig.select2) {
		angular.extend(options, uiConfig.select2);
	}
	return {
		scope: true,
		transclude: 'element',
		template: '<div ng-transclude></span>',
		restrict: 'AC',
		link: function(scope, elm, attrs) {
			var init = true, // Only query the selected value's data when the plugin loads
				opts, // instance-specific options
				prevVal = '',
				loaded = false;

			opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2));
			if (attrs.multiple !== undefined) {
				opts.multiple = true;
			}

			function initialize(newVal) {
				setTimeout(function(){
					if (newVal !== undefined) {
						if (opts.ajax) {
							if (newVal && !$.isEmptyObject(newVal)) {
								if (init && opts.initial) {
									var url = opts.initial(opts.ajax.url, values, opts.multiple);
								    $http({ method: 'GET', url: url }).success(function(data, status, headers, config){
										data = opts.ajax.results(data);
										elm.select2('val', data.results || '');
									});
									init = false;
								}
							} else {
							    elm.select2('val', '');
							}
						} else {
							elm.select2('val', newVal);
						}
					}
				},0);
			}

			// Initialize the plugin late so that the injected DOM does not disrupt the template compiler
			setTimeout(function(){
				elm.select2(opts);
				loaded = true;
				// If a watch was fired before initialized, set the init value
				initialize(prevVal);
			},0);

			// Watch the model for programmatic changes
			scope.$watch(attrs.ngModel, function(newVal, oldVal) {
				if (newVal === prevVal) {
					return;
				}
				if (loaded) {
					initialize(newVal);
				}
				prevVal = newVal;
			});
			// If you want you can watch the options dataset for changes
			if (angular.isString(opts.watch)) {
				scope.$watch(opts.watch, function(newVal, oldVal){
					if (loaded && prevVal) {
						setTimeout(function(){
							elm.select2('val', prevVal);
						},0);
					}
				});
			}
		}
	};
}]);