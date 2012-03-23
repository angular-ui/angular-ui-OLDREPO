
/**
 * @directive ui:tooltip Creates a tooltip via an anchor
 * @param {Object} data JSON Object
 *
 * Example:
 * 
 * JSON:
 *
 * {
 *  title : 'Title',
 *  body  : 'Tooltip Body...'
 * } 
 *
 * <a ng-bind-html="item.title" class="help" ui:tooltip="item"></a>
 *
 */

angular.module('ui.directives', []).directive('uiTooltip', [function() {
  return function linkingFn(scope, linkElement, attrs) {
    var view = angular.element('<div class="help"></div>');
    view.prepend(angular.element('<h1></h1>'));
    var body = document.getElementsByTagName('body')[0];
    var $tooltip = angular.element(body).after(view).next();
    setTimeout(function() {
      var data = JSON.parse(attrs.uiTooltip);
      view.find('h1').text(data.title);
      view.append(angular.element('<p>' + data.body + '</p>'));
    }, 500);
    linkElement.bind('mouseover',function(evt) {
      $tooltip.running = true;
      $tooltip.css('display', 'block');
    }).bind('mouseout', function(evt) {
      $tooltip.running = false;
      $tooltip.css('display', 'none');
    });
    angular.element(document).bind('mousemove', function(evt) {
      var x = parseFloat(evt.clientX) + 50 + 'px';
      var y = parseFloat(evt.clientY) - 50 + 'px';
      if ($tooltip.running) {
        $tooltip.css('left', x);
        $tooltip.css('top', y);
      };
    });
  };
}]);

/* EOF */