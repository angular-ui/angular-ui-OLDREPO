describe('unique', function() {
  var uniqueFilter;

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    uniqueFilter = $filter('unique');
  }));

  it('should return unique entries based on object equality', function () {
    var arrayToFilter = [{key: 'value'}, {key: 'value2'}, {key: 'value'}];
    expect(uniqueFilter(arrayToFilter, '')).toEqual([{key: 'value'}, {key: 'value2'}]);
  });

  it('should return unique entries based on the key provided', function () {
    var arrayToFilter = [{key: 'value', other: 'other1'}, {key: 'value2', other: 'other2'}, {key: 'value', other: 'other3'}];
    expect(uniqueFilter(arrayToFilter, 'key')).toEqual([{key: 'value'}, {key: 'value2'}]);
  });

  it('should return unique entries based on the key provided for complex objects', function () {
    var arrayToFilter = [{key: 'value'}, {key: 'value2'}, {key: 'value'}];
    expect(uniqueFilter(arrayToFilter, 'key')).toEqual([{key: 'value'}, {key: 'value2'}]);
  });

  it('should return unmodified object if not array', function() {
    expect(uniqueFilter('string','someKey')).toEqual('string');
  });

  it('should return unmodified array if key not provided', function() {
    var arrayToFilter = [{key: 'value1'}, {key: 'value2'}];
    expect(uniqueFilter(arrayToFilter)).toEqual(arrayToFilter);
  });

})