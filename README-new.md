# angular-ui

***

## Usage

### Requirements

* **AngularJS v1.0.0+** is currently required.
* **jQuery / Plugins** _(depends on directive)._ Check specific directive dependencies for more information

## Installation

The repository comes with the modules pre-built and compressed into the `build/` directory.

```javascript
angular.module('myApp', ['ui']);
```

The modules can be found in the [Directives](http://github.com/angular-ui/angular-ui/modules/directives) and [Filters](http://github.com/angular-ui/angular-ui/modules/filters) folders. Check out the readme file associated with each module for specific module usage information.

## Development

You do not need to build the project to use it - see above - but if you are working on it then this is what you need to know.

### Requirements

1. Install local dependencies: 

```bash
$ npm install
```

2. Install global dependencies `grunt`, `coffee-script`, and `testacular`:

```bash
$ npm install -g testacular coffee-script grunt`
```

### Build Files & Run Tests

Before you commit, always run `grunt` to build and test everything once.

```bash
$ grunt
```

### Test & Develop

The modules come with unit tests that should be run on any changes and certainly before commiting changes to the project.  The unit tests should also provide further insight into the usage of the modules.

First, start the testacular server:
```bash
$ grunt server 
```
Then, open your browser to `http://localhost:8080` and run the watch command to re-run tests on every save:
```bash
$ grunt watch
```