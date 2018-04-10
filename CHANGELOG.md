# 1.0.8 (April 10, 2018)

* Introduced sass for styles 
* Reduced the size of the bundle consideraly 

# 1.0.7 (April 7, 2018)

* Fix total break of application when submit function is not provided, instead console error is shown.
* Styles improvements: now element is being positioned and displayed by css flex;

# 1.0.6 (April 2, 2018)

* Styles fixing 


# 1.0.5 (March 30, 2018)

* Now searching with diacritics are supported. So i.e. you can either search 'star wars' or 'stár wärs' both will match 'star wars'. 
* Flexbox added for improving styles. 

# 1.0.0 (March 25, 2018)

* Add localStorage for persisting searches entered. This is optional.
* Persistent is new prop. It determines when component should behave as persistent.
* Add minor style modifications.
* Now when searching, white spaces are being ignored.

# 0.1.9 (March 23, 2018)

* Supports closing suggestion list by pressing escape key
* New tests added for testing new functionality
* Add minor improvements to suggestion list style

# 0.1.8 (March 22, 2018)

* Testing input logic

# 0.1.7 (March 21, 2018)

* Add property **minLength**. This property allows specifying the minimum length of text before starting making suggestions.
* Default properties are now loaded from static properties.
* Fix bug when **recentSearches** is not passed as property. 
