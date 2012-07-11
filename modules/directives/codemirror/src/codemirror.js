/**
 * Binds a CodeMirror widget to a <textarea> element.
 */
angular.module('ui.directives').directive('uiCodemirror', ['ui.config', function (uiConfig) {
    uiConfig.codemirror = uiConfig.codemirror || {};
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
            var defaults = {
                onChange: function (ed) {
                    newValue = ed.getValue();
                    if ( newValue !== ngModel.$viewValue ) {
                        ngModel.$setViewValue(ed.getValue());
                        scope.$apply();
                    }
                }
            };
            var options = angular.extend(defaults, scope.$eval(attrs.uiCodemirror), uiConfig.codemirror);
            console.log(options);
            var codemirror = CodeMirror.fromTextArea(elm[0], options);
            ngModel.$render = function() {
                codemirror.setValue(ngModel.$viewValue);
            };
       }
    };
}]);