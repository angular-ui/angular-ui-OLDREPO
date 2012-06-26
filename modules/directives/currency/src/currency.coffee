###
 Gives the ability to style currency based on its sign.
###
angular.module('ui.directives',[]).directive 'uiCurrency', (currencyFilter)->
  restrict: 'AC'
  require: '?ngModel'
  link: ($scope, element, attrs, controller)->

    controllerOptions = $scope[attrs.options] || $scope.uiCurrencyOptions | {}
    
    ## I don't care for this, the angular.extend is not working the way i expect it to
    options =
      pos: attrs.pos || controllerOptions.pos || 'ui-currency-pos'
      neg: attrs.neg || controllerOptions.neg || 'ui-currency-neg'
      zero: attrs.zero || controllerOptions.zero || 'ui-currency-zero'
      symbol: attrs.symbol || controllerOptions.symbol || undefined
    
    ## first check for controller, then for element level

    renderview = (viewvalue)->
    
      num = viewvalue * 1 

      if num > 0
        element.addClass options.pos 
      else 
        element.removeClass options.pos
      
      if num < 0 
        element.addClass options.neg 
      else 
        element.removeClass options.neg
      
      if num == 0
        element.addClass options.zero 
      else 
        element.removeClass options.zero
    
      if viewvalue is ''
        element.text '' 
      else 
        element.text (currencyFilter num, options.symbol)
      true
      
    if controller?
       controller.$render = ()->
          value = controller.$viewValue
          element.val(value)
          renderview(value)
          true
    else
       renderview $scope[attrs.num]
    true
    