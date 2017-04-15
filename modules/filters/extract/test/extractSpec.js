describe('format', function() {
  var extractFilter;

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
    {id:11, f1:'one', f2:'1-echo-1'},
    {id:12, f1:'oNeplus', f2:'1-echo-1'},
    {id:13, f1:'Oneplus', f2:'1-echo-1'}
  ]

  beforeEach(module('ui.filters'));
  beforeEach(inject(function($filter) {
    extractFilter = $filter('extract');
  }));
  // eq
  it('Should return only object with id equal to 2', function() {
    expect(extractFilter(sampleData, {id__eq:2})).toEqual([sampleData[1]])
  });
  // lt
  it('Should return only object with id < 2', function(){
      expect(extractFilter(sampleData, {id__lt:2})).toEqual(
          [sampleData[0]]
      )
  });
  // lte
  it('Should return only objects with id <= 2', function(){
      expect(extractFilter(sampleData, {id__lte:2})).toEqual(
          [sampleData[0], sampleData[1]]
      )
  });
  // gt
  it('Should return only objects with id > 12', function(){
      expect(extractFilter(sampleData, {id__gt:12})).toEqual(
          [sampleData[12]]
      );
  });
  // gte
  it('Should return only objects with id >= 12', function(){
      expect(extractFilter(sampleData, {id__gte:12})).toEqual(
          [sampleData[11], sampleData[12]]
      );
  });
  // in
  it('Should return only objects with id in [7,10,12]', function() {
      expect(extractFilter(sampleData, {id__in:[7,10,12]})).toEqual(
          [sampleData[6], sampleData[9], sampleData[11]]
      );
  });
  // endswith
  it('Should return only objects with "f1" ends with "st"', function() {
      expect(extractFilter(sampleData, {f1__endswith:"st"})).toEqual(
          [sampleData[0], sampleData[1], sampleData[2], sampleData[3], sampleData[4], sampleData[6]]
      )
  });
  // or test
  it('Should return only object with id < 5 or equal to 9', function() {
    expect(extractFilter(sampleData, {id__lt:5, or:{id__eq:9}})).toEqual(
        [sampleData[0], sampleData[1], sampleData[2], sampleData[3], 
            sampleData[4], sampleData[8]])
  });

  // startswith test
  it('Should return only object with f1 startswith "test"', function() {
    expect(extractFilter(sampleData, {f1__startswith:'test'})).toEqual(
        [sampleData[0], sampleData[3], sampleData[5], sampleData[6]]
        )
  });

  // istartswith test
  it('Should return only objects with f1 starts with "One"',
      function(){
        expect(extractFilter(sampleData, {f1__istartswith:"One"})).toEqual(
          [sampleData[9], sampleData[10], sampleData[11], sampleData[12]]
        )
      }
  )

});
