[![Build Status](http://circleci-badges-max.herokuapp.com/img/NormanColoma/suggestion-react-search-input?token=10091003d058c6c79a62cc8ce1af8cbeaed2e753)](https://circleci.com/gh/NormanColoma/suggestion-react-search-input)
[![npm version](https://badge.fury.io/js/suggestion-react-input-search.svg)](https://badge.fury.io/js/suggestion-react-input-search)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/NormanColoma/suggestion-react-search-input/blob/master/LICENSE.md)
# Suggestion React Input Search

A suggestion search input for React based on searches entered. Once a option is entered, it will be displayed as a suggestion in following searches.

![Demo](https://i.imgur.com/bxvzWwf.gif
)

## Features 

* Supports keyboard navigation (up and down arrows).

* Supports hiding the list by clicking outside the input or by pressing escape key.

* Submitting is supported by enter key (when submitting a function is fired up).

* As a result of submitting, a function is fired up. This function must be provided as a property for this component. This function may take the selected option or the text entered in case it does not match any suggested option. 

* When clicking an item from dropdown list, submitting function is fired up. The behaviour in this case, is the same as submitting the input by pressing the enter key.

* It is possible to specify the minimum length of the text entered before starting making suggestions.

* If an item is selected, or mouse is over it, when submitting, the option selected is chosen.

* Once a new option is entered, it will appear as a suggestion in the following searches.

* The state of suggestions is not persistent, so it must be handled by you.

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

* **onSubmitFunction:** Function to be executed when clicking an item or submitting text entered. **Required**

* **recentSearches:** An array containing recent searches. As long as you want to start with preestablished historic of searches, pass it. By default empty array is passed. **Optional**

* **placeholder:** The placeholder to be displayed in input. By default is *'Search...'*. **Optional**

* **inputPosition:** Where the input will be positioned at the screen. By default its value is *'start'* which means that will be positioned at the left of the screen. Supported values are: *'center', 'start', 'end'.* **Optional**

* **inputClass:** Styles provided to the input. It comes with very simple styles, but you can pass your own styles by setting this property with the name of your custom class. **Optional**

* **suggestionListClass:** Styles provided to the dropdown list of suggestions. It comes with very simple styles, but you can pass your own styles by setting this property with the name of your custom class. **Optional**

* **minLength:** Specifies the length of the text entered before starting making suggestions. By default the length is fixed to 1 character. **Optional**
