describe('ellipsize', function() {
  
  var ellipsizeFilter;

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    ellipsizeFilter = $filter('ellipsize');
  }));

  it('should ellipsize the string', function() {
    expect(ellipsizeFilter('This is a long string')).toEqual('This is…g string');
  });
  
  it('should do nothing, since the string doesn\' need to be ellipsized', function() {
    expect(ellipsizeFilter('Hello string')).toEqual('Hello string');
  });
  
});