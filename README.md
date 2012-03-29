
# Directives

## Angular.js - UI directives

***

## Build Requirements:

Install UglifyJS & LESS:

```bash
$ [sudo] npm install uglify-js -g
$ [sudo] npm install less -g
$ [sudo] npm install coffee-script -g
```

## Build/Compress:

```bash
$ make build
```

## Template

```javascript

/**
 * Directive Description
 * @param expression {type} description
 * @example code demo (if possible)
 */

angular.module('ui.directives').directive('uiMYDIRECTIVE', [function() {
  return function(scope, elm, attrs) {
  };
}]);

```
