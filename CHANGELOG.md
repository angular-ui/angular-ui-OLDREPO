# [Cha Cha Cha Changes](http://www.youtube.com/watch?v=pl3vxEudif8&t=0m53s)

## master
* New **format** filter
* Lots of cleanup! Consistent indentation, linting
* Custom builds via grunt (soon to be leveraged via builder)
* uiDate now watches options

## v0.2.0
* Unit tests. Unit tests. Unit tests.
* New **inflector** filter (previously named **prettifier**)
  * Added 2 alternative modes, now contains: humanize, underscore and variable
* **Passthrough directive** (uiJq) now fixes common ngModel problems due to trigger(change). Can optionally be disabled
* Removed **Length Filter** (you can instead do {{ ( myArray | filter: { gender:'m' } ).length }})
* Added **validate directive**, allows you to pass validation functions
* **Sortable directive**
* Fixed **unique filter**
* **Highlight filter** has had bug fixes
* **Event directive** has been refactored / improved
* **Keypress directive** has been refactored / improved
* New **if-directive** instead of **remove directive** (removed)
* New **google maps directive**
* New **animate directive** that transitions the injection of new DOM elements (transitioning the removal of DOM is still not supported yet)
* Improvements to **scrollfix directive**

## v0.1.0
* New folder structure
* Too many to list