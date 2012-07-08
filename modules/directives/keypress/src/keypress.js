
/**
 * Bind one or more handlers to particular keys or their combination
 * @param hash {mixed} keyBindings Can be an object or string where keybinding expression of keys or keys combinations and AngularJS Exspressions are set. Object syntax: "{ keys1: expression1 [, keys2: expression2 [ , ... ]]}".  String syntax: ""expression1 on keys1 [ and expression2 on keys2 [ and ... ]]"". Expression is an AngularJS Expression, and key(s) are dash-separated combinations of keys and modifiers (one or many, if any. Order does not matter). Supported modifiers are 'ctrl', 'shift', 'alt' and key can be used either via its keyCode (13 for Return) or name. Named keys are 'backspace', 'tab', 'enter', 'esc', 'space', 'pageup', 'pagedown', 'end', 'home', 'left', 'up', 'right', 'down', 'insert', 'delete'.
 * @example <input ui-keypress="{enter:'x = 1', 'ctrl-shift-space':'foo()', 'shift-13':'bar()'}" /> <input ui-keypress="foo = 2 on ctrl-13 and bar('hello') on shift-esc" />
 **/
angular.module('ui.directives').directive('uiKeypress', [function(){
  return {
    link: function(scope, elm, attrs) {
      var keysByCode = {
        8:  'backspace',
        9:  'tab',
        13: 'enter',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'insert',
        46: 'delete'
      };

      elm.bind('keydown', function(event) {
        var params, paramsParsed, expression, keys;
        try {
          params = scope.$eval(attrs.uiKeypress);
          paramsParsed = true;
        } catch (error) {
          params = attrs.uiKeypress.split(/\s+and\s+/i);
          paramsParsed = false;
        }

        // First of all we split binding of multiple keys
        angular.forEach(params, function(v, k) {
          if(paramsParsed) {
            // An object passed
            expression = v;
            keys = k;
          } else {
            // A string passed
            v = v.split(/\s+on\s+/i);
            expression = v[0];
            keys = v[1];
          }

          keys = keys.split('-');

          var mainKeyPressed = keys.indexOf( keysByCode[event.keyCode] ) > -1 || keys.indexOf( event.keyCode.toString() ) > -1

          var altPressed   = event.metaKey || event.altKey;
          var ctrlPressed  = event.ctrlKey;
          var shiftPressed = event.shiftKey;

          var altRequired   =  keys.indexOf('alt')   > -1;
          var ctrlRequired  =  keys.indexOf('ctrl')  > -1;
          var shiftRequired =  keys.indexOf('shift') > -1;

          if( mainKeyPressed &&
              ( altRequired   == altPressed   ) &&
              ( ctrlRequired  == ctrlPressed  ) &&
              ( shiftRequired == shiftPressed )
            ) {
		        // Run the function
		        scope.$eval(expression);
          }
        });
      });
    }
  };
}]);