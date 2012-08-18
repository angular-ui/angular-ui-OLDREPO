/**
 * Bind one or more handlers to particular keys or their combination
 * @param hash {mixed} keyBindings Can be an object or string where keybinding expression of keys or keys combinations and AngularJS Exspressions are set. Object syntax: "{ keys1: expression1 [, keys2: expression2 [ , ... ]]}". String syntax: ""expression1 on keys1 [ and expression2 on keys2 [ and ... ]]"". Expression is an AngularJS Expression, and key(s) are dash-separated combinations of keys and modifiers (one or many, if any. Order does not matter). Supported modifiers are 'ctrl', 'shift', 'alt' and key can be used either via its keyCode (13 for Return) or name. Named keys are 'backspace', 'tab', 'enter', 'esc', 'space', 'pageup', 'pagedown', 'end', 'home', 'left', 'up', 'right', 'down', 'insert', 'delete'.
 * @example <input ui-keypress="{enter:'x = 1', 'ctrl-shift-space':'foo()', 'shift-13':'bar()'}" /> <input ui-keypress="foo = 2 on ctrl-13 and bar('hello') on shift-esc" />
 **/
angular.module('ui.directives').directive('uiKeypress', ['$parse', function ($parse) {
  return {
    link: function (scope, elm, attrs) {
      var keysByCode = {
        8: 'backspace',
        9: 'tab',
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

      var params, paramsParsed, expression, keys, combinations = [];
      try {
        params = scope.$eval(attrs.uiKeypress);
        paramsParsed = true;
      } catch (error) {
        params = attrs.uiKeypress.split(/\s+and\s+/i);
        paramsParsed = false;
      }

      // Prepare combinations for simple checking
      angular.forEach(params, function (v, k) {
        var combination = {};
        if (paramsParsed) {
          // An object passed
          combination.expression = $parse(v);
          combination.keys = k;
        } else {
          // A string passed
          v = v.split(/\s+on\s+/i);
          combination.expression = $parse(v[0]);
          combination.keys = v[1];
        }

        keys = {};
        angular.forEach(combination.keys.split('-'), function (value) {
          keys[value] = true;
        });
        combination.keys = keys;
        combinations.push(combination);
      });

      // Check only mathcing of pressed keys one of the conditions
      elm.bind('keydown', function (event) {
        // No need to do that inside the cycle
        var altPressed = event.metaKey || event.altKey;
        var ctrlPressed = event.ctrlKey;
        var shiftPressed = event.shiftKey;

        // Iterate over prepared combinations
        angular.forEach(combinations, function (combination) {

          var mainKeyPressed = (combination.keys[keysByCode[event.keyCode]] || combination.keys[event.keyCode.toString()]) || false;

          var altRequired = combination.keys.alt || false;
          var ctrlRequired = combination.keys.ctrl || false;
          var shiftRequired = combination.keys.shift || false;

          if (mainKeyPressed &&
            ( altRequired == altPressed   ) &&
            ( ctrlRequired == ctrlPressed  ) &&
            ( shiftRequired == shiftPressed )
            ) {
            // Run the function
            scope.$apply(function () {
              combination.expression(scope, { '$event': event });
            });
          }
        });
      });
    }
  };
}]);
