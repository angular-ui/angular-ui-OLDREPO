describe('map', function() {
  var scope, $rootScope, $compile

  beforeEach(module('ui.directives'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('test', function() {
    var mapOptions = {};
    beforeEach(function() {
      scope = $rootScope.$new();
      createMap(mapOptions);
    })

    function createMap(options) {
      scope.gmapOptions = options;
      $compile('<div ui-map="gmap" ui-options="gmapOptions"></div>')(scope);
    };

    it('should bind google map object to scope', function() {
      expect(scope.gmap).toBeTruthy();
    });
  });

});