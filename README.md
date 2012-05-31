# Angular.js - UI Contributions

***

## Usage

### Requirements

* **AngularJs v1.0.0rc?** is currently required. **TODO:** Narrow down to specific RC version
* **jQuery / Plugins** _(depends on directive)._ Check specific directive dependencies for more information

### Installation

The repository comes with the modules pre-built and compressed into the build directory.

1. Include the javascript files - angular-ui.js or angular-ui.min.js  
2. Add a dependency to one or more ui modules onto your angular application module:  

```javascript
angular.module('myApp', ['ui']); // to include everything  
angular.module('myApp', ['ui.directives']); // to include all the directives only  
angular.module('myApp', ['ui.directives.date']); // to include only a single module
```
The modules can be found in the [Directives](http://github.com/angular-ui/angular-ui/modules/directives) and [Filters](http://github.com/angular-ui/angular-ui/modules/filters) folders. Check out the readme file associated with each module for specific module usage information.

## Building

You do not need to build the project to use it - see above - but if you are hacking on it then this is what you need to know.

### Requirements

Install UglifyJS & LESS:

```bash
$ [sudo] npm install uglify-js -g  
$ [sudo] npm install less -g  
$ [sudo] npm install coffee-script -g
```

### Build/Compress

```bash
$ make build
```

## Testing

The modules come with unit tests that should be run on any changes and certainly before commiting changes to the project.  The unit tests should also provide further insight into the usage of the modules.

### Requirements
The project is configured to use the marvellous [Testacular](http://vojtajina.github.com/testacular/) test runner from AngularJS developer Vojta.  It is a nodeJS app.  You simply install it from NPM:

```bash
$ [sudo] npm install testacular -g
```

The test configuration is in test/test-config.js.  You pass this in when you run the test server:

```bash
$ testacular test/test-config.js
```

Capture your testing browsers by browsing to http://localhost:8080 (in this case) on all the different flavours of browser you wish to test.

Then whenever you make a change either run
```bash
$ make build
$ testacular-run
```

Or even quicker

```bash
$ make test
```

# Template

```javascript

/**
 * Directive Description
 * @param expression {type} description
 * @example code demo (if possible)
 */
angular.module('ui.directives').directive('uiMYDIRECTIVE', ['ui.config', function(uiConfig) {
  return function(scope, elm, attrs) {
  };
}]);

```
