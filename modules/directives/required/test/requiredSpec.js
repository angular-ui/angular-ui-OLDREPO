describe('uiRequired', function() {
	var elm, scope;
	beforeEach(module('ui.directives'));
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope;
		elm = $compile(
			'<form name="myForm"><input name="value" ui-required="isRequired" ng-model="value"></form>'
		)($rootScope);
	}));
	it('should be required if expression is true', function() {
		scope.$apply(function(){
			scope.isRequired = true;
			scope.value = '';
		});
		expect(scope.myForm.value.$valid).toBe(false);
	});
	it('should not be required if expression is false', function() {
		scope.$apply(function(){
			scope.isRequired = false;
			scope.value = '';
		});
		expect(scope.myForm.value.$valid).toBe(true);
	});
	it('should update validity if expression changes', function() {
		scope.$apply(function(){
			scope.isRequired = false;
			scope.value = '';
		});
		expect(scope.myForm.value.$valid).toBe(true);
		scope.$apply(function(){
			scope.isRequired = true;
		});
		expect(scope.myForm.value.$valid).toBe(false);
	});
	it('should update validity if value changes', function() {
		scope.$apply(function(){
			scope.isRequired = true;
			scope.value = '';
		});
		expect(scope.myForm.value.$valid).toBe(false);
		scope.$apply(function(){
			scope.value = 'test';
		});
		expect(scope.myForm.value.$valid).toBe(true);
	});
});
