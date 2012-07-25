/**
 * Makes an input required based on a condition
 *
 * @example <input ui-required="isRequired" ng-model="value">
 *  		<label><input type="checkbox" ng-model="isRequired"> Is this required?</label> 
 */
angular.module('ui.directives').directive('uiRequired', function(){
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ngModel) {
			var required = false;
			ngModel.$formatters.push(function(value){
				ngModel.$setValidity('required', !!(required && value));
				return value;
			});
			attrs.$observe('ngRequired', function(value){
				required = !!value;
				ngModel.$setValidity('required', !!(required && ngModel.$viewValue));
			});
		}
	};
});