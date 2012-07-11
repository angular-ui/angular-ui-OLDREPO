/**
 * Binds a CodeMirror widget to a <textarea> element.
 */
angular.module('ui.directives').directive('uiCodemirror', ['ui.config', function (uiConfig) {
    uiConfig.codemirror = uiConfig.codemirror || {};
    return {
        require: 'ngModel',
        link: {
            post: function (scope, elm, attrs, ngModel) {

                var expression,
                    options = {
                        onChange: function (ed) {
                            elm.val(ed.getValue());
                            ngModel.$setViewValue(elm.val());
                            scope.$apply();
                        },
                        value: scope.$eval(attrs.ngModel)
                    };

                expression = attrs.uiCodemirror ? scope.$eval(attrs.uiCodemirror) : {};

                angular.extend(options, uiConfig.codemirror, expression);

                CodeMirror(function (elt) {
                    elm[0].parentNode.replaceChild(elt, elm[0]);
                }, options);
            }
        }
    };
}]);