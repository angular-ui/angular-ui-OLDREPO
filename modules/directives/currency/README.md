# ui-currency directive

This directive allows you to give greater control over your currency elements by setting styles based on the pos/neg/zero value 

## Usage

Apply the directive to your html elements:

	myAppModule.controller('MyController', function($scope) {
	    $scope.SomeNumber = 123;
	});

    <span ui-currency num="SomeNumber"></span> <!-- one way binding -->
    <span ui-currency ng-model="SomeModel"></span> <!-- two way binding -->

Default styles are in angular-ui.css and are pretty boring, you could just override these in your
stylesheet and make things most excellent (e.g. increasing size for negatives, doing a hover sorta thingy )

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

All the options can be controlled by ui.config (see Global Defaults) or passed in the ui-currency attribute on the declaration. 
The symbol attribute defaults to null and is then controlled by the default locale settings. 

    <span ui-currency="{ pos='pstyle' neg='nstyle' zero='zstyle' symbol='USD$' }" num="SomeNumber" ></span>
    <span ui-currency="{ pos='pstyle' neg='nstyle' zero='zstyle' symbol='USD$' }" ng-model="SomeNumber" ></span>

### Notes

This directive wraps angular's currency filter. If that changes, you are on your own.
    
    