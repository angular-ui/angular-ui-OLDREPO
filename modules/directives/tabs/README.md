# ui-tabs directive

This directive allows you to transform a container element to a tab control.

# Requirements

- twitter bootstrap CSS (or custom styling for ul.nav.nav-tabs)

# Usage

Add the date module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['ui.directives.tabs'])

Apply the directive to an element:

    <div ui-tabs="{tab1 : {label : 'this is the first tab'}, tab2 : {label : 'this is the second tab'}}">
        <div>This is the content of the second tab</div>
        <div ng-include="/more/likely/tabs/are/includes.htm"></div>
    </div>

The tab definitions could of course also come from a controller:

    <div ui-tabs="getTabDefinitions()">
        <div>This is the content of the second tab</div>
        <div ng-include="/more/likely/tabs/are/includes.htm"></div>
    </div>

## Options/META data

The ui-tabs directive reauires you to provide initialization information for each tab. The number of tabs define must match
the number of direct child element of the current element. Each tab must be specified a label. One tab can optinally be set active, is not, the first tab is activated.

All tabs are also exposed through the current scope (and child scope of course) which allows you to control them from your controller(s).

    $scope.tabs.tab1.label = 'New value for tab 1';
    $scope.tabs.tab3.activate();
    var isFirstTabActive = $scope.tab1.active;

