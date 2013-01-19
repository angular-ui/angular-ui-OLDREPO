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
        ui.item.indexs =ui.item.index()
        
        # if item is received not sort it again as it is in correct position
        if ui.item.received == true
            ui.item.received = false
        else
            # Reorder array and apply change to scope
            ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0])
        
        scope.$apply()

      onReceive = (e, ui) -> 
        # added item to array into correct position and set up flag
        ngModel.$modelValue.splice(ui.item.indexs,0,ui.item.connectedData)
        ui.item.received = true;
        scope.$apply()

      onRemove = (e, ui) -> 
        # copy data into item 
        if ngModel.$modelValue.length == 1
            ui.item.connectedData = ngModel.$modelValue.splice(0,1)[0]
         else
            ui.item.connectedData = ngModel.$modelValue.splice(ui.item.index(),1)[0]
            
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

      # If user provided 'receive' callback compose it with onReceive function
      _receive = opts.receive
      opts.receive = (e, ui) ->
        onReceive(e, ui)
        _receive?(e, ui)
        scope.$apply();

      # If user provided 'remove' callback compose it with onRemove function
      _remove = opts.remove
      opts.remove = (e, ui) ->
        onRemove(e, ui)
        _remove?(e, ui)
        scope.$apply();

    # Create sortable
    element.sortable(opts)

]
