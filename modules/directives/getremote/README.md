# get-remote directive

Loads remote data in current scope.
Useful to allow selects to load options from APIs, for example.

# Requirements

- $http

# Usage

Include module and apply the directive to an element, with your desired rule

## Rule syntax

    path as alias
    
Where:
 - path: is the path to your data JSON file or API
 - alias: is the name of the variable in current scope you choosed to feed with data

## Example

    <select get-remote="/api/users as myUsers" ng-options="usr._id as usr.name group by usr.depto for usr in myUsers"></select>
    
or simply

    <pre get-remote="/path/to/data.json as myData">{{myData}}</pre>
