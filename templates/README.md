# ui-template directives

These are boilerplates for creating filters and directives. They use uiConfig so that you can globally assign config options (see uiConfig doc). 
Currently there are only two templates, one for filter and one for directive along with simple a implementation of each.

## Usage

Here's how the two sample impls could be used
<html> 
    <head>
        <!-- your angular and other library imports here -->
        <script>
        // create global prefix/suffix for elements using wrap filter
        var myApp = angular.module('myApp',['ui'])
            .value('ui.config', { 'wrapFilter': { 'prefix' : 'foo-', 'suffix' : '-bar' }});
         
        function MyCtrl($scope) {
            $scope.alpha = "some words here";
            $scope.num = " 123 ";
        } 
        </script>

        <style>
        .ui-alpha {
            font-size: 150%;
            color: red;
        }
        .ui-numeric {
            font-size: 180%;
            color: green;
        }
        </style>

    </head>

    <body ng-controller="MyCtrl">
        <div>
            <span>{{alpha | wrap}}</span>
            <span ui-stylize ng-model="alpha"></span>
            <span ui-stylize ng-model="num"></span>
        </div>
    </body>

</html>
### Todo
    - sample wrapping third party lib