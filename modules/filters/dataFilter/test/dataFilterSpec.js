describe('format', function() {
  var dataFilterFilter;

  var sampleData = [
    {id:1, f1:'test', f2:'100-3'},
    {id:2, f1:'100 test', f2:'100-2'},
    {id:3, f1:'echo test', f2:'100-1'},
    {id:4, f1:'test', f2:'100-fellow'},
    {id:5, f1:'jump test', f2:'901'},
    {id:6, f1:'test apple', f2:'ech-1'},
    {id:7, f1:'test test', f2:'green-1'},
    {id:8, f1:'jump', f2:'jump-123'},
    {id:9, f1:'green', f2:'1-2-3'},
    {id:10, f1:'one', f2:'1-echo-1'},
  ]

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    dataFilterFilter = $filter('dataFilter');
  }));
  it('Should return only object with id equal to 2', function() {
    expect(dataFilterFilter(sampleData, {id__eq:2})).toEqual([sampleData[1]])
  });
  it('Should return only object with id < 5 or equal to 9', function() {
    expect(dataFilterFilter(sampleData, {id__lt:5, or:{id__eq:9}})).toEqual(
        [sampleData[0], sampleData[1], sampleData[2], sampleData[3], 
        sampleData[8]])
  });

  it('Should return only object with f1 contains "test"', function() {
    expect(dataFilterFilter(sampleData, {f1__startswith:'test'})).toEqual(
        [sampleData[0], sampleData[3], sampleData[5], sampleData[6]]
        )
  });
});
