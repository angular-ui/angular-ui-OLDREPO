describe('uiEvent', function() {
  var $scope, $rootScope, $compile

  beforeEach(module('ui.directives'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  //helper for creating event elements
  function eventElement(scope, eventObject) {
    function uiEventAttrs() {
      var str = '', first = true;
      angular.forEach(eventObject, function(val, key) {
        if (first) first = false;
        else str += ', ';
        str += "'"+key+"': '"+val+"'";
      });
      return '{'+str+'}';
    };
    return $compile('<span ui-event="'+uiEventAttrs()+'">')(scope);
  };

  describe('test', function() {
    it('should work with dblclick event and assignment', function() {
      $scope = $rootScope.$new();
      var elm = eventElement($scope, {'dblclick': 'dbl=true'});
      expect($scope.dbl).toBeUndefined();
      elm.trigger('dblclick');
      expect($scope.dbl).toBe(true);
    });

    it('should work with two events in one key a function', function() {
      $scope = $rootScope.$new();
      $scope.counter = 0;
      $scope.myfn = function() {
        $scope.counter++;
      };
      var elm = eventElement($scope, {'keyup mouseenter': 'myfn()'});
      elm.trigger('keyup');
      elm.trigger('mouseenter');
      expect($scope.counter).toBe(2);
    });

    it('should work work with multiple entries', function() {
      $scope = $rootScope.$new();
      $scope.amount = 5;
      var elm = eventElement($scope, {
        'click': 'amount=amount*2',
        'mouseenter': 'amount=amount*4',
        'keyup': 'amount=amount*3', 
      });
      elm.trigger('click');
      expect($scope.amount).toBe(10);
      elm.trigger('mouseenter');
      expect($scope.amount).toBe(40);
      elm.trigger('keyup');
      expect($scope.amount).toBe(120);
    });

    it('should allow passing of $event object', function() {
      $scope = $rootScope.$new();
      $scope.clicky = function(par1, $event, par2) {
        expect($event).toBeTruthy();
        expect(par1 + par2).toBe(3);
      };
      var elm = eventElement($scope, {'click': 'clicky(1, $event, 2)'});
      $(elm).trigger('click');
    });
  });

});