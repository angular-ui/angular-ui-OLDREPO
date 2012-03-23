
# Directives

## Angular.js - UI directives

***

## Build Requirements:

Install UglifyJS & LESS:

```bash
$ [sudo] npm install uglify-js -g
$ [sudo] npm install less -g
```

## Build/Compress:

```bash
$ make js
```

## Using Tooltips

```html
<div ng:app="demoApp">
  <div ng:controller="TooltipController">
    <h3>Tooltip</h3>
    <p>
      <a ng-bind-html="item.title" class="help" ui:tooltip="{{item}}"></a>
    </p>
  </div>
</div>
```

```javascript

/**
 * Setup our App Module
 * Register the 'ui' module as a dependency
 */
 
var demoApp = angular.module('demoApp', ['ui'], function($routeProvider) {
});

/**
 * Tooltip Demo Controller
 */

function TooltipController($scope) {
  $scope.item =  {
    title : 'Title',
    body  : 'Tooltip Body...'
  };
};

```

## Template

```javascript

/**
 * Directive Description
 * @param expression {type} description
 * @example code demo (if possible)
 */

angular.module('ui.directives', []).directive('uiMYDIRECTIVE', [function() {
  return function(scope, elm, attrs) {
  };
}]);

```
