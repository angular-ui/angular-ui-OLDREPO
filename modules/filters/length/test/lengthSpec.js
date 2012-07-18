describe('length', function() {
  var lengthFilter;

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    lengthFilter = $filter('length');
  }));

  it('should return length of an array', function() {
    expect(lengthFilter([0,1,2])).toBe(3);
    expect(lengthFilter([])).toBe(0);
  });
  it('should return length of an object', function() {
    expect(lengthFilter({a:'b',b:'c',c:'d'})).toBe(3);
  });
  it('should return length of a string', function() {
    expect(lengthFilter('abcde')).toBe(5);
  });
})