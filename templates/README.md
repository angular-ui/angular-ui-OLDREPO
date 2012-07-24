# ui-template directives

These are boilerplates for creating filters and directives. They use uiConfig so that you can globally assign config options (see uiConfig doc). 
Currently there are only two templates, one for filter and one for directive along with simple a implementation of each.

## Usage

Here's how the two template impls could be used
<html> 
    <head>
        <!-- your angular and other library imports here -->
        <script>
        // create global prefix/suffix for elements using wrap filter
        var myApp = angular.module('myApp',['ui'])
            .value('ui.config', { 'directiveTmpl': { 'somedirectiveopt' : 'myval' } });
         
        function MyCtrl($scope) {
            $scope.mymodel = "a value";
        } 
        </script>

    </head>

    <body ng-controller="MyCtrl">
        <div>
            <span>{{mymodel | filterTmpl}}</span>

            <span ui-directive-template ng-model="mymodel"></span>
            <ui-directive-template ng-model="mymodel"></ui-directive-template>
            
        </div>
    </body>

</html>
