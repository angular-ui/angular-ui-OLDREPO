###
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
###
angular.module('ui.directives').directive 'uiSortable', ['ui.config', (uiConfig) ->
  options = {}
  if uiConfig.sortable?
    angular.extend(options, uiConfig.sortable)

  require: '?ngModel'
  link: (scope, element, attrs, ngModel) ->
    opts = angular.extend({}, options, scope.$eval(attrs.uiOptions))

    if ngModel?
      onStart = (e, ui) ->
        # Save position of dragged item
        ui.item.data('ui-sortable-start', ui.item.index())

      onUpdate = (e, ui) ->
        # Fetch saved and current position of dropped element
        start = ui.item.data('ui-sortable-start')
        end   = ui.item.index()

        # Reorder array and apply change to scope
        ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0])
        scope.$apply()

      # If user provided 'start' callback compose it with onStart function
      _start = opts.start
      opts.start = (e, ui) ->
        onStart(e, ui)
        _start?(e, ui)
        scope.$apply()

      # If user provided 'update' callback compose it with onUpdate function
      _update = opts.update
      opts.update = (e, ui) ->
        onUpdate(e, ui)
        _update?(e, ui)
        scope.$apply()

    # Create sortable
    element.sortable(opts)

]
