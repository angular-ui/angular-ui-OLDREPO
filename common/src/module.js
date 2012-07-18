/**
 * AngularUI for AngularJS
 * v0.1.0
 * 
 * @link http://angular-ui.github.com/
 */

angular.module('ui.config', []).value('ui.config', {});
angular.module('ui.filters', ['ui.config']);
angular.module('ui.directives', ['ui.config']);
angular.module('ui', [
  'ui.filters', 
  'ui.directives',
  'ui.config'
]);
