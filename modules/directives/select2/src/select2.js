
/**
 * An awesome alternative enhancement to the original jQuery Chosen (HarvestHQ)
 * 
 * @link http://ivaynberg.github.com/select2/
 * @param [uiSelect2] {object} containing configuration options. Merged onto your uiConfig.select2 definition
 */
directive('uiSelect2', ['uiConfig', function(uiConfig){
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