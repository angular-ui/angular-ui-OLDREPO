
/**
 * An awesome alternative enhancement to the original jQuery Chosen (HarvestHQ)
 * 
 * @link http://ivaynberg.github.com/select2/
 * @param [uiSelect2] {object} containing configuration options. Merged onto your uiConfig.select2 definition
 */
angular.module('ui.directives').directive('uiSelect2', ['ui.config', function(uiConfig){
	uiConfig.select2 = uiConfig.select2 || {};
	return function(scope, elm, attrs) {
		var options = angular.extend({}, uiConfig.select2, scope.$eval(attrs.uiSelect2));
		setTimeout(function(){
			elm.select2(options);
			scope.$watch(attrs.ngModel, function(newVal, oldVal){
				elm.select2('val', newVal);
			});             
		},0);
	};
}]);


/**
*  --- NEW VERSION : Needs to be updated to v1.0 ---
* 
 * My god, the most convoluted pile of shlock ever
 *
 * @concerns When the plugin loads, it injects an extra DIV into the DOM below itself. This disrupts the 
 *   compiler, breaking everything below. Because of this, it must be initialized asynchronously (late).
 *   Since the ng:model and ng:options/ng:repeat can be populated by AJAX, they must be monitored in order
 *   to refresh the plugin so that it reflects the selected value
 * @AJAX Multiselect - For these, you must use an <input>. The values will NOT be in the form of an Array,
 *   but a comma-separated list. You must adjust the value as needed before using accordingly
 * @params [options] {object} The configuration options passed to $().select2(). Refer to the documentation
 *   - [watch] {string} an expression to monitor for changes. For use with ng:repeat populated via ajax
angular.directive('jv:select2', function(expression, compiledElement) {
	var options = { allowClear: true };
	if (angularui['select2']) {
		angular.extend(options, angularui['select2']);
	}
	return function(elm) {
		var scope = this,
			init = true, // Only query the selected value's data when the plugin loads
			opts,
			prevVal = '',
			loaded = false,
			model = elm.attr('ng:model');
		
		function initialize(newVal) {	
			if (newVal !== undefined) {
				if (opts.ajax) {
					if (newVal && !$.isEmptyObject(newVal)) {
						if (init) {
						    if (opts.multiple) {
								if (angular.isArray(newVal)) {
									ids = newVal.join('&ids=');
								} else {
									ids = newVal.split(',').join('&ids=');
								}
							} else {
								ids = newVal;
							}
						    $.ajax(opts.ajax.url + '&ids=' + ids, {success: function(data){
								data = opts.ajax.results(data);
								if (data.results[0]) {
						    		elm.select2('val', data.results[0]);
								} else {
									elm.select2('val', '');
								}
						    }});
							init = false
						}
					} else {
					    elm.select2('val', '');
					}
				} else {
					elm.select2('val', newVal);
				}
			}
			
		}
		
		opts = angular.extend({}, options, scope.$eval(expression));
		if (elm.attr('multiple') !== undefined) {
			opts.multiple = true;
		}
		
		// Initialize the plugin late so that the injected DOM does not disrupt the template compiler
		setTimeout(function(){
			elm.select2(opts);
			loaded = true;
			// If a watch was fired before initialized, set the init value
			initialize(prevVal);
		},0);
		
		// Watch the model for programmatic changes
		scope.$watch(model, function(scope, newVal, oldVal) {
			if (newVal === prevVal) {
				return;
			}
			if (loaded) {
				initialize(newVal);
			}
			prevVal = newVal;
		});
		// If you want you can watch the set of options for changes
		if (angular.isString(opts.watch)) {
			scope.$watch(opts.watch, function(scope, newVal, oldVal){
				if (loaded && prevVal) {
					setTimeout(function(){
						elm.select2('val', prevVal);
					},0);
				}
			});
		}
	};
});
*/