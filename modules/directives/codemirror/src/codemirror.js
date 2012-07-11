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
                    var newValue = ed.getValue();
                    // We only update the model if the value has changed - this helps get around a little problem where $render triggers a change despite already being inside a $apply loop.
                    if ( newValue !== ngModel.$viewValue ) {
                        ngModel.$setViewValue(ed.getValue());
                        scope.$apply();
                    }
                }
            };
            // Merge together the options from the uiConfig and the attribute itself with the onChange event above.
            var options = angular.extend(defaults, scope.$eval(attrs.uiCodemirror), uiConfig.codemirror);
            var codemirror = CodeMirror.fromTextArea(elm[0], options);

            // Override the ngModelController $render method, which is what gets called when the model is updated.
            // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
            ngModel.$render = function() {
                codemirror.setValue(ngModel.$viewValue);
            };
       }
    };
}]);