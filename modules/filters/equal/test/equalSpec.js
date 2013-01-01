describe('equal', function () {
  var equalFilter;

  beforeEach(module('ui.filters'));
  beforeEach(inject(function ($filter) {
    equalFilter = $filter('equal');
  }));

  it('should return the items if the items is not an array', function() {
    var arrayToFilter = 'not an array';
    expect(equalFilter(arrayToFilter)).toEqual(arrayToFilter);
  });

  it('should return the items if the obj is not an object', function() {
    var arrayToFilter = ['item1', 'item2'];
    var obj = 1;
    expect(equalFilter(arrayToFilter, obj)).toEqual(arrayToFilter);
  });

  it('should return the items if the obj is empty', function() {
    var arrayToFilter = ['item1', 'item2'];
    var obj = {};
    expect(equalFilter(arrayToFilter, obj)).toEqual(arrayToFilter);
  });

  it('should return the items with matching keys obj has a key that is an integer', function() {
    var arrayToFilter = [{key: 1}, {key: 2}, {key: 12}];
    var obj = {key: 1};
    expect(equalFilter(arrayToFilter, obj)).toEqual([{key: 1}]);
  });

  it('should return the items with matching keys obj has a key that is an string', function() {
    var arrayToFilter = [
      'not object',
      {key: 'value1', nonkey: 1},
      {key: 'value2', nonkey: 2},
      {key: 'value12', nonkey: 3},
      {key: 'value1', nonkey:4}
    ];
    var obj = {key: 'value1'};
    expect(equalFilter(arrayToFilter, obj)).toEqual([{key: 'value1', nonkey: 1}, {key: 'value1', nonkey: 4}]);
  });

  it('should return the items with matching keys obj has a key that is an object', function() {
    var arrayToFilter = [
      {key: {subkey: 1}, nonkey: 1},
      {key: {subkey: 2}, nonkey: 2},
      {key: {subkey: 12}, nonkey: 3},
      {key: {subkey: 1}, nonkey:4}
    ];
    var obj = { key: {subkey: 1} };
    expect(equalFilter(arrayToFilter, obj)).toEqual([{key: {subkey: 1}, nonkey: 1}, {key: {subkey: 1}, nonkey: 4}]);
  });

});