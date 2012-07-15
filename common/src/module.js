
/**
 * @module ui
 * Bind Angular.js modules
 */
angular.module('ui.config', []).value('ui.config', {});
angular.module('ui.filters', ['ui.config']);
angular.module('ui.directives', ['ui.config']);
angular.module('ui', [
  'ui.filters', 
  'ui.directives',
  'ui.config'
]);