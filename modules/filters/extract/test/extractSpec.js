describe('extract', function() {
  var extractFilter, testData = [
    { firstName: 'Igor', lastName: 'Minar', age: '10' },
    { firstName: 'Dean', lastName: 'Sofer', age: '20' },
    { firstName: 'Jason', lastName: 'Stathom', age: '30' }
  ];

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    extractFilter = $filter('extract');
  }));

  it('should return an array of properties', function() {
    expect(extractFilter(testData, 'extract')).toEqual('Prefix <span class="ui-match">extract</span> Suffix');
  });
  it('should extract nothing if no match found', function() {
    expect(extractFilter(testData, 'no match')).toEqual(testData);
  });
  it('should extract nothing for the undefined filter', function() {
    expect(extractFilter(testData, undefined)).toEqual(testData);
  });
  it('should work correctly for number filters', function() {
    expect(extractFilter('3210123', 0)).toEqual('321<span class="ui-match">0</span>123');
  });
  it('should work correctly for number text', function() {
    expect(extractFilter(3210123, '0')).toEqual('321<span class="ui-match">0</span>123');
  });
  it('should extract a matching phrase', function() {
    expect(extractFilter(testData, 'extract', true)).toEqual('Prefix <span class="ui-match">extract</span> Suffix');
  });
  it('should extract nothing if no match found', function() {
    expect(extractFilter(testData, 'no match', true)).toEqual(testData);
  });
  it('should extract nothing for the undefined filter', function() {
    expect(extractFilter(testData, undefined, true)).toEqual(testData);
  });
  it('should work correctly for number filters', function() {
    expect(extractFilter('3210123', 0, true)).toEqual('321<span class="ui-match">0</span>123');
  });
  it('should work correctly for number text', function() {
    expect(extractFilter(3210123, '0', true)).toEqual('321<span class="ui-match">0</span>123');
  });
  it('should not extract a phrase with different letter-casing', function() {
    expect(extractFilter(testData, 'extract', true)).toEqual(testData);
  });
  it('should extract nothing if empty filter string passed - issue #114', function() {
    expect(extractFilter(testData, '')).toEqual(testData);
  });
});