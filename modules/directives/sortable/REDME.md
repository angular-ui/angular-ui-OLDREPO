# ui-sortable directive

This directive allows you to sort array with drag & drop.

## Requirements

- JQuery
- JQueryUI

## Usage

Load the script file: sortable.js in your application:

    <script type="text/javascript" src="modules/directives/sortable/src/sortable.js"></script>

Add the sortable module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['ui.directives.sortable'])

Apply the directive to your form elements:

    <ul ui-sortable ng-model="items">
      <li ng-repeat="item in items">{{ item }}</li>
    </ul>

### Options

All the jQueryUI Sortable options can be passed through the directive.

  myAppModule.controller('MyController', function($scope) {
    $scope.items = ["One", "Two", "Three"];

    $scope.sortableOptions = {
      update: function(e, ui) { ... },
      axis: 'x'
    };
  });

  <ul ui-sortable="sortableOptions" ng-model="items">
    <li ng-repeat="item in items">{{ item }}</li>
  </ul>


