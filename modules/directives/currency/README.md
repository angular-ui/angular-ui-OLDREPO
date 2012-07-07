# ui-currency directive

This directive allows you to add a date-picker to your form elements.

## Requirements

- JQuery
- JQueryUI

## Usage

Apply the directive to your html elements:

    <span ui-currency num="SomeNumber"></span>

Default styles are in angular-ui.css and are pretty boring, you could just override these in your
stylesheet and make things more interesting (e.g. increasing size for negatives )

  .ui-currency-pos {
    color: green;
  }
  .ui-currency-neg {
    color: red;
  }
  .ui-currency-zero {
    color: blue;
  }

### Options

All the options can be passed through the directive or set on the html element. 
NOTE: attributes override controller options

	myAppModule.controller('MyController', function($scope) {
	    $scope.SomeNumber = 123;
		$scope.uiCurrencyOptions = {

		};
	});

    <span ui-currency options="uiCurrencyOptions" num="SomeNumber"></span>
    <span ui-currency num="SomeNumber" pos="pstyle" neg="nstyle" zero="zstyle" symbol="USD$"></span>

### Notes

ui-currency
    - one-way binding unless you have in an ng-repeat
    - does not currently work with ng-model. 
    - is supported only for attribute style elements
    
### Todo
    - support ng-model
    