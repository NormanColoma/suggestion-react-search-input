![CircleCI](https://img.shields.io/circleci/build/github/NormanColoma/suggestion-react-search-input.svg)
[![npm version](https://badge.fury.io/js/suggestion-react-input-search.svg)](https://badge.fury.io/js/suggestion-react-input-search)
[![Coverage Status](https://coveralls.io/repos/github/NormanColoma/suggestion-react-search-input/badge.svg?branch=master)](https://coveralls.io/github/NormanColoma/suggestion-react-search-input?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/NormanColoma/suggestion-react-search-input/blob/master/LICENSE.md)
# Suggestion React Input Search

A suggestion search input for React based on searches entered. Once a option is entered, it will be displayed as a suggestion in following searches.

![Demo](https://i.imgur.com/bxvzWwf.gif
)

## Features 

* Supports keyboard navigation (up and down arrows).

* Supports hiding the list by clicking outside the input or by pressing escape key.

* Submitting is supported by enter key (when submitting a function is fired up). As well, submission is fired by pressing
tab key when there is only one item remaining.

* As a result of submitting, a function is fired up. This function must be provided as a property for this component. This function may take the selected option or the text entered in case it does not match any suggested option. 

* When clicking an item from dropdown list, submitting function is fired up. The behaviour in this case, is the same as submitting the input by pressing the enter key.

* Insensitive case is supported when searching.

* When searching blank spaces and diacritics do not affect matching comparison.

* It is possible to specify the minimum length of the text entered before starting making suggestions.

* If an item is selected, or mouse is over it, when submitting, the option selected is chosen.

* Once a new option is entered, it will appear as a suggestion in the following searches.

* The state of suggestions can be either persistent, or not.

* Allows using floating label rather than regular placeholder.

## Installation 

```
npm i suggestion-react-input-search
```

## How to use

After installing the package, just import it in your React component.

```javascript
import SuggestionInputSearch from 'suggestion-react-input-search'; 
class App extends Component {

  handleOnSubmit(term) {
      // Do whatever you need i.e. calling API
  }

  render() {
    const recentSearches = ['star wars', 'star wars IV', 'star trek', 'star wars I'];
    const placeholder = 'Search films...';
    const inputPosition = 'center';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SuggestionInputSearch
          onSubmitFunction={this.handleOnSubmit}
          recentSearches={recentSearches}
          placeholder={placeholder}
          inputPosition={inputPosition}
        />
      </div>
    );
  }
}

export default App;
```

## Properties

* **onSubmitFunction(function):** Function to be executed when clicking an item or submitting text entered. **Required**

* **recentSearches(array):** An array containing recent searches. As long as you want to start with preestablished historic of searches, pass it. By default empty array is passed. **Optional**

* **placeholder(string):** The placeholder to be displayed in input. By default is *'Search...'*. **Optional**

* **inputPosition(string):** Where the input will be positioned at the screen. By default its value is *'start'* which means that will be positioned at the left of the screen. Supported values are: *'center', 'start', 'end'.* **Optional**

* **inputClass(string):** Styles provided to the input. It comes with very simple styles, but you can pass your own styles by setting this property with the name of your custom class. **Optional**

* **suggestionListClass(string):** Styles provided to the dropdown list of suggestions. It comes with very simple styles, but you can pass your own styles by setting this property with the name of your custom class. **Optional**

* **minLength(number):** Specifies the length of the text entered before starting making suggestions. By default the length is fixed to 1 character. **Optional**

* **persistent(boolean):** Indicates whether component should behave as persistent one or not. By default is set to false.

* **floatingLabel(boolean):** Specifies whether input should contains floating label rather than input placeholder. By default is set to false. **Optional**

* **autocompleteOnMatch(boolean):** Enables autocompletion of suggested term when there is only ine suggestion remaining. By default is set to false. **Optional**

* **maxSuggestions(number):** Establish the number of suggestions to show. By default is set to 5. **Optional**

## About positioning and displaying

This component is being displayed with css flex, so positioning will be directly affected by the width you provide to the
parent element wrapping this component. 

Besides the width of component is set to 400px. As long as you want to change this width, you can provide both, **inputClass** and **suggestionListClass** (bear in mind this overwritres all given styles).
