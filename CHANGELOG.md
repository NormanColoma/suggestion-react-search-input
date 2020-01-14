# 1.4.0 (January 14, 2020)

* Fixing arrow key navigations errors when trying to navigate on empty suggestion list

# 1.3.0 (June 17, 2018)

* Now **maxSuggestions** property only limitis the number of suggestions displayed at time, and the rest of suggestions remain accessible if you scroll over the list. 
* Suggestion list is scrollable by moving mouse wheel or by moving upward/downward through arrow keys.

# 1.2.0 (May 5, 2018)

* Now is possible to set the number of suggestions that are going to be shown at time, by passing **maxSuggestions** props. By default this prop is set to 5. 

### Breaking changes 

Unless you change the value of **maxSuggestions**, only 5 suggestions will be shown (in case the introduced term matches with 5 or more) since it is the default value for metioned prop. 

# 1.1.2 (May 2, 2018) 

* Adding ability to autocomplete the suggestion when there is only one remaining. You can accomplish this, by setting **autocomplete Match** prop to true.
* Added some animations for floating label. 

# 1.1.1 (April 28, 2018) 

* Now is possible to choose between floating label rather than regular input placeholder. For this, just set **floatingLabel** prop to true and pass it to the component (by default is set to false). 
* If there is only one suggestion remaining in the list, by pressing tab key that suggestion is selected and submition function is fired.

# 1.0.8 (April 10, 2018)

* Introduced sass for styles 
* Component's size was pretty reduced

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
