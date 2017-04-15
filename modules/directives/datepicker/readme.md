# ui-datepicker directive

This directive allows you to add a bootstrap based date-picker to your form elements.

# Requirements

 - Bootstrap Datepicker [https://github.com/eternicode/bootstrap-datepicker]
 
# Usage
Reference AngularJS UI javascript file.

Add the date module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['ui.directives'])
    
Apply the directive to your form elements:

    <input ui-datepicker name="DateOfBirth"></input>
    
## Options

All of bootstrap datepicker options are passed through angular attributes.

	<label for="inputStartDate" class="control-label">Start Date:</label>
	<input data-ng-model="startDate" data-ui-end-date="endDate" data-ui-autoclose="true" data-ui-datepicker="" id="inputStartDate"/>

	<label for="inputEndDate" class="control-label">End Date:</label>
	<input data-ng-model="endDate" data-ui-start-date="startDate" data-ui-autoclose="true" data-ui-datepicker="" id="inputEndDate"/>
	
Option attributes are evaluated against scope. So, if you need to pass a date (for example), then you need to put string value in quotes (`data-ui-start-date="'11/03/2012'"`).

Expressions passed to `data-ui-start-date` and `data-ui-end-date` are both watched. So, example above allows to select daterange. When `endDate` is selected, end date on `inputStartDate` is limited automatically. And vice versa for the `inputEndDate`.