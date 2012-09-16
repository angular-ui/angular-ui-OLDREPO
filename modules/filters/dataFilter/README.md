# dataFilter

This filter allows you to subset data from array, according to filter rules.
Filter rules are strored in object with Django ORM like syntax.

## Example

`<div ng-repeat="array|dataFilter:{id__eq:2, or:{id__eq:10}}"></div>`  
which should process <code>array</code> only with id equal to 2 or 10.

## Syntax

**Available field lookups:**
 
* eq - equal
* lt - less than
* lte - less equal than
* gt - greater than
* gte - greater equal than
* in  
  in a given list  
  **Example**  
    `array|dataFilter:{id__in:[1,2,3]}`  
    returns only those objects which ids are in [1,2,3]
* startswith - case-sensitive start-with
* istartswith - case-insensitive start-with
* endswith - case-sensitive end-with
* iendswith - case-insensitive end-with
* contains - case-sensitive containment test
* icontains - case-insensitive containment test
* range - range test (inclusive)  
  **Example**  
    `array|dataFilter:{id__range:[2,4]}`  
    returns only those objects which ids match:  
        *id&gt;=2 and id&lt;=4*
* regex - regex test

**Available join operators:**  
You can also join conditions using standard bool operators

* and
* or

**Example**  
`array|dataFilter:{id__range:[2,4], 'or':{id_range:[8,10]}}`  
equivalent to SQL:  
    `SELECT * FROM array WHERE (id >= 2 AND id <= 4) OR (id >= 8 AND id <= 10);`

