describe('uiKeypress', function () {

  var $scope, $compile;

  var createKeyEvent = function (mainKey, alt, ctrl, shif) {
    var keyEvent = jQuery.Event("keydown");

    keyEvent.keyCode = mainKey;
    keyEvent.altKey = alt || false;
    keyEvent.ctrlKey = ctrl || false;
    keyEvent.shiftKey = shif || false;

    return keyEvent;
  };

  var createElement = function (elementDef) {
    var elementStr = angular.isString(elementDef) ? elementDef : angular.toJson(elementDef);
    return $compile("<span ui-keypress='" + elementStr + "'>")($scope);
  };

  beforeEach(module('ui.directives'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();

    $scope.cb = function (event) {
      this.event1 = event;
    };
  }));

  describe('keypress with Object syntax', function () {

    it('should support single key press', function () {
      createElement({'13':'event=true'}).trigger(createKeyEvent(13));
      expect($scope.event).toBe(true);
    });

    it('should support combined key press', function () {
      createElement({'ctrl-shift-13':'event=true'}).trigger(createKeyEvent(13, false, true, true));
      expect($scope.event).toBe(true);
    });

    it('should support multiple key press definitions', function () {
      var elm = createElement({'13':'event1=true', 'ctrl-shift-13':'event2=true'});

      elm.trigger(createKeyEvent(13));
      expect($scope.event1).toBe(true);

      elm.trigger(createKeyEvent(13, false, true, true));
      expect($scope.event2).toBe(true);
    });

    it('should support $event in expressions', function () {

      var element = createElement({'esc':'cb($event)', '13':'event2=$event'});

      element.trigger(createKeyEvent(27));
      expect($scope.event1.keyCode).toBe(27);

      element.trigger(createKeyEvent(13));
      expect($scope.event2.keyCode).toBe(13);
    });
  });

  describe('keypress with String syntax', function () {

    it('should support single key press', function () {
      createElement('event=true on 13').trigger(createKeyEvent(13));
      expect($scope.event).toBe(true);
    });

    it('should support combined key press', function () {
      createElement('event=true on ctrl-shift-13').trigger(createKeyEvent(13, false, true, true));
      expect($scope.event).toBe(true);
    });

    it('should support multiple key press definitions', function () {
      var elm = createElement('event1=true on 13 and event2=true on ctrl-shift-13');

      elm.trigger(createKeyEvent(13));
      expect($scope.event1).toBe(true);

      elm.trigger(createKeyEvent(13, false, true, true));
      expect($scope.event2).toBe(true);
    });

    it('should support $event in expressions', function () {

      var element = createElement('cb($event) on esc and event2=$event on enter');

      element.trigger(createKeyEvent(27));
      expect($scope.event1.keyCode).toBe(27);

      element.trigger(createKeyEvent(13));
      expect($scope.event2.keyCode).toBe(13);
    });
  });
});