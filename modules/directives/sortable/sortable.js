/*
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
*/
angular.module('ui.directives').directive('uiSortable', [
  'ui.config', function(uiConfig) {
    var options;
    options = {};
    if (uiConfig.sortable)
      angular.extend(options, uiConfig.sortable);

    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var onReceive, onRemove, onStart, onUpdate, opts, _receive, _remove, _start, _update;

        opts = angular.extend({}, options, scope.$eval(attrs.uiSortable));

        if (ngModel) {

          onStart = function(e, ui) {
            // Save position of dragged item
            ui.item.data('ui-sortable-start', ui.item.index());
          };

          onUpdate = function(e, ui) {
            // Fetch saved and current position of dropped element
            var end, start;
            start = ui.item.data('ui-sortable-start');
            end = ui.item.index();
            ui.item.indexs = ui.item.index();

            // if item is received not sort it again as it is in correct position
            if (ui.item.received === true) {
              ui.item.received = false;
            } else {
              // Reorder array and apply change to scope
              ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0]);
            }

            scope.$apply();
          };

          onReceive = function(e, ui) {
            // added item to array into correct position and set up flag
            ngModel.$modelValue.splice(ui.item.indexs, 0, ui.item.connectedData);
            ui.item.received = true;

            scope.$apply();
          };

          onRemove = function(e, ui) {
            // copy data into item 
            if (ngModel.$modelValue.length === 1) {
              ui.item.connectedData = ngModel.$modelValue.splice(0, 1)[0];
            } else {
              ui.item.connectedData = ngModel.$modelValue.splice(ui.item.index(), 1)[0];
            }

            scope.$apply();
          };

          // If user provided 'start' callback compose it with onStart function
          _start = opts.start;
          opts.start = function(e, ui) {
            onStart(e, ui);
            if (typeof _start === "function")
              _start(e, ui);

            scope.$apply();
          };

          // If user provided 'update' callback compose it with onUpdate function
          _update = opts.update;
          opts.update = function(e, ui) {
            onUpdate(e, ui);
            if (typeof _update === "function")
              _update(e, ui);

            scope.$apply();
          };

          // If user provided 'receive' callback compose it with onReceive function
          _receive = opts.receive;
          opts.receive = function(e, ui) {
            onReceive(e, ui);
            if (typeof _receive === "function")
              _receive(e, ui);

            scope.$apply();
          };

          // If user provided 'remove' callback compose it with onRemove function
          _remove = opts.remove;
          opts.remove = function(e, ui) {
            onRemove(e, ui);
            if (typeof _remove === "function")
              _remove(e, ui);

            scope.$apply();
          };
        }

        // Create sortable
        element.sortable(opts);
      }
    };
  }
]);
