/*
 Attaches jquery-ui input mask onto input element
 */
angular.module('ui.directives').directive('uiMask', [
  function () {
    var maskDefinitions = {
      '9': /\d/,
      'A': /[a-zA-Z]/,
      '*': /[a-zA-Z0-9]/
    };
    return {
      priority: 100,
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, iElement, iAttrs, controller) {
        var maskProcessed = false, eventsBound = false,
            mask, maskCaretMap, maskPatterns, maskPlaceholder, characterCount,
            value, valueMasked, isValid,
            oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

        iAttrs.$observe('uiMask', initialize);
        controller.$formatters.push(formatter);
        controller.$parsers.push(parser);

        function initialize(maskAttr) {
          if (typeof maskAttr == 'undefined') {
            maskProcessed = false;
            unbindEventListeners();
            return false;
          }
          mask = scope.$eval(maskAttr);
          processRawMask(mask);
          if (!maskProcessed) {
            unbindEventListeners();
            return false;
          }
          initializeElement();
          bindEventListeners();
        }

        function processRawMask(mask) {
          maskCaretMap    = [];
          maskPatterns    = [];
          maskPlaceholder = '';
          characterCount  = 0;

          // If mask is an array, it's a complex mask!
          if (mask instanceof Array) {
            angular.forEach(mask, function(item, i) {
              if (item instanceof RegExp) {
                maskCaretMap.push(characterCount++);
                maskPlaceholder += '_';
                maskPatterns.push(item);
              }
              else if (typeof item == 'string') {
                angular.forEach(item.split(''), function(chr, i) {
                  maskPlaceholder += chr;
                  characterCount++;
                });
              }
            });
          }
          // Otherwise it's a simple mask
          else if (typeof mask === 'string') {
            angular.forEach(mask.split(''), function(chr, i) {
              if (maskDefinitions[chr]) {
                maskCaretMap.push(characterCount);
                maskPlaceholder += '_';
                maskPatterns.push(maskDefinitions[chr]);
              }
              else
                maskPlaceholder += chr;
              characterCount++;
            });
          }
          maskCaretMap.push(characterCount);
          maskProcessed = maskCaretMap.length > 1 ? true : false;
        }

        function initializeElement() {
          value       = oldValueUnmasked = unmaskValue(controller.$viewValue || '');
          valueMasked = oldValue         = maskValue(value);
          isValid     = validateValue(value);
          if (iAttrs.maxlength)
            iElement.attr('maxlength', maskCaretMap[maskCaretMap.length-1]*2); // Double maxlength to allow pasting at end of mask
          iElement.attr('placeholder', maskPlaceholder);
          iElement.val(isValid ? valueMasked : '');
        }

        function bindEventListeners() {
          if (eventsBound)
            return true;
          iElement.bind('blur', blurHandler);
          iElement.bind('input propertychange keyup click mouseout', eventHandler);
          eventsBound = true;
        }

        function unbindEventListeners() {
          iElement.unbind('.uiMask');
          eventsBound = false;
        }

        function formatter(modelValue) {
          if (!maskProcessed)
            return modelValue;
          value   = unmaskValue(modelValue || '');
          isValid = validateValue(value);
          controller.$setValidity('mask', isValid);
          return isValid ? maskValue(value) : undefined;
        }

        function parser(viewValue) {
          if (!maskProcessed)
            return viewValue;
          value   = unmaskValue(viewValue || '');
          isValid = validateValue(value);
          controller.$setValidity('mask', isValid);
          if (value === '' && controller.$error.required !== undefined)
            controller.$setValidity('required', false);
          return isValid ? value : undefined;
        }

        function validateValue(value) {
          // Allow zero-length values (this is required's responsibility)
          return value.length ? value.length === maskCaretMap.length - 1 : true;
        }

        function unmaskValue(value) {
          var valueUnmasked    = '',
              maskPatternCopys = maskPatterns.slice();
          angular.forEach(value.split(''), function(chr, i) {
            if (maskPatternCopys.length && maskPatternCopys[0].test(chr)) {
              valueUnmasked += chr;
              maskPatternCopys.shift();
            }
          });
          return valueUnmasked;
        }

        function maskValue(unmaskedValue) {
          var valueMasked      = '',
              maskCaretMapCopy = maskCaretMap.slice();
          angular.forEach(maskPlaceholder.split(''), function(chr, i) {
            if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
              valueMasked  += unmaskedValue.charAt(0) || '_';
              unmaskedValue = unmaskedValue.substr(1);
              maskCaretMapCopy.shift(); }
            else
              valueMasked += chr;
          });
          return valueMasked;
        }

        function blurHandler(e) {
          oldCaretPosition   = 0;
          oldSelectionLength = 0;
          if (!isValid) {
            valueMasked = '';
            iElement.val('');
            scope.$apply(function() {
              controller.$setViewValue('');
            });
          }
        }

        function eventHandler(e) {
          // Allows more efficient minification
          var eventWhich = e.which,
              eventType  = e.type;

          // Shift and ctrl aren't going to ruin our party.
          if (eventWhich == 16 || eventWhich == 91) return true;

          var elem            = iElement,
              val             = elem.val(),
              valOld          = oldValue,
              valMasked,
              valUnmasked     = unmaskValue(val),
              valUnmaskedOld  = oldValueUnmasked,

              caretPos        = getCaretPosition(this) || 0,
              caretPosOld     = oldCaretPosition || 0,
              caretPosDelta   = caretPos - caretPosOld,
              caretPosMin     = maskCaretMap[0],
              caretPosMax     = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),

              selectionLen    = getSelectionLength(this),
              selectionLenOld = oldSelectionLength || 0,
              isSelected      = selectionLen > 0,
              wasSelected     = selectionLenOld > 0,

                                                                // Case: Typing a character to overwrite a selection
              isAddition      = (val.length > valOld.length) || (selectionLenOld && val.length >  valOld.length - selectionLenOld),
                                                                // Case: Delete and backspace behave identically on a selection
              isDeletion      = (val.length < valOld.length) || (selectionLenOld && val.length == valOld.length - selectionLenOld),
              isSelection     = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

              isKeyLeftArrow  = eventWhich == 37,
                                                    // Necessary due to "input" event not providing a key code
              isKeyBackspace  = eventWhich == 8  || (eventType != 'keyup' && isDeletion && (caretPosDelta === -1)),
              isKeyDelete     = eventWhich == 46 || (eventType != 'keyup' && isDeletion && (caretPosDelta === 0 ) && !wasSelected),

              // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
              // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
              // non-mask character. Also applied to click since users are (arguably) more likely to backspace
              // a character when clicking within a filled input.
              caretBumpBack   = (isKeyLeftArrow || isKeyBackspace || eventType == 'click') && caretPos > caretPosMin;

          oldSelectionLength = selectionLen;

          // These events don't require any action
          if (eventType == 'mouseout' || isSelection || (isSelected && (eventType == 'click' || eventType == 'keyup')))
            return true;

          // Value Handling
          // ==============
          // User attempted to delete but raw value was unaffected--correct this grievous offense
          if ((eventType == 'input' || eventType == 'propertychange') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
            while (isKeyBackspace && caretPos > 0 && !isValidCaretPosition(caretPos))
              caretPos--;
            while (isKeyDelete && caretPos < maskPlaceholder.length && maskCaretMap.indexOf(caretPos) == -1)
              caretPos++;
            var charIndex = maskCaretMap.indexOf(caretPos);
            // Strip out character that user inteded to delete if mask hadn't been in the way.
            valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
          }

          valMasked        = maskValue(valUnmasked);
          oldValue         = valMasked;
          oldValueUnmasked = valUnmasked;
          elem.val(valMasked);

          // Caret Repositioning
          // ===================

          // Ensure that typing always places caret ahead of typed character
          if (isAddition && (caretPos <= caretPosMin))
            caretPos = caretPosMin + 1;

          if (caretBumpBack)
            caretPos--;

          // Make sure caret is within min and max positions
          caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

          // Scoot the caret around until it's in a valid position and within min/max limits
          while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax)
            caretPos += caretBumpBack ? -1 : 1;

          if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld)))
            caretPos++;

          oldCaretPosition = caretPos;
          setCaretPosition(this, caretPos);
        }

        function isValidCaretPosition(pos) { return maskCaretMap.indexOf(pos) > -1; }

        function getCaretPosition(input) {
          if (input.selectionStart !== undefined)
            return input.selectionStart;
          else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', -input.value.length);
            return selection.text.length;
          }
        }

        function setCaretPosition(input, pos) {
          if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos,pos); }
          else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
          }
        }

        function getSelectionLength(input) {
          if (input.selectionStart !== undefined)
            return (input.selectionEnd - input.selectionStart);
          if (document.selection)
            return (document.selection.createRange().text.length);
        }

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
        if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this == null) {
              throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
              return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
              n = Number(arguments[1]);
              if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
              } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
              }
            }
            if (n >= len) {
              return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
              if (k in t && t[k] === searchElement) {
                return k;
              }
            }
            return -1;
          };
        }

      }
    };
  }
]);