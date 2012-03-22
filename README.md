
# Directives

## Angular.js - UI directives

***

## Build Requirements:

Install Uglify-JS

```bash
$ [sudo] npm install uglify-js -g
```

## Build:

```bash
$ make js
```

## Template

```javascript
/**
 * Directive Description
 *
 * @param expression {type} description
 * @example code demo (if possible)
 */
angular.module('ui.directives', []).directive('uiMYDIRECTIVENAME', [function() {
  return function(scope, elm, attrs) {
    /* YOUR UI:DIRECTIVE */
  };
}]);
```
