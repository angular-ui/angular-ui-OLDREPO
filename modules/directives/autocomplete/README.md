# ui-autocomplete directive

This directive allows you to add an autocomplete to your form elements.

Some details on my [blog](http://sharepointkunskap.wordpress.com/2013/01/04/angular-jquery-ui-autocomplete/)

# Requirements

- JQuery
- JQueryUI

# Usage

Load the script file in your application:

    <script type="text/javascript" src="angular-ui.js"></script>

Add the date module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['ui.directives'])

Apply the directive to your form elements:

    <input ui-autocomplete="autocompleteOptions"></input>

## Options

All the jQueryUI Autocomplete options can be passed through the directive.

	myAppModule.controller('MyController', function($scope) {
		$scope.autocompleteOptions = {
			changeYear: true,
			changeMonth: true,
			yearRange: '1900:-0'
		};
	});
