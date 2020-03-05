import React from 'react';
import PropTypes from 'prop-types';
// Components
import SuggestionList from './suggestion-list/suggestion-list';
import floatingLabel from './floating-label/floating-label';

// State functions and constans
import {
    addNewSearch, resetAndHideSuggestions, selectItemIndex, establishSuggestionsForTerm,
    hideSuggestions, loadSearches, saveSearches
} from './state-management/state-management';
import {
    ENTER_KEY_CODE, DOWN_ARROW_KEY_CODE, UP_ARROW_KEY_CODE, ESCAPE_KEY_CODE,
    CLICK_EVENT, TAB_KEY_CODE
} from './keyboard.constants';

// Styles
import './suggestion-input-search.scss';
import FloatingLabel from './floating-label/floating-label';

const EMPTY_SEARCH_TERM = "";
const EMPTY_TERM = '';
const EMPTY_SUGGESTIONS = 0;
const NO_SELECTED_ITEM_INDEX = -1;
const SINGLE_SUGGESTION = 1;
const FIRST_ELEMENT_INDEX = 0;
const DIACRITICS_REGEX = /[\u0300-\u036f]/g;
const MAXIMUM_SUGGESTIOMS_TO_SHOW = 5;
const DEFAULT_ROW_HEIGHT = 41.59;

class SuggestionInputSearch extends React.Component {
    constructor(props) {
        super(props);

        const { inputClass, suggestionListClass, inputPosition, persistent } = props;
        const recentSearches = persistent ? loadSearches() : this.props.recentSearches;

        this.state = {
            showSuggestions: false,
            suggestions: [],
            recentSearches,
            term: EMPTY_TERM,
            selectedItemIndex: NO_SELECTED_ITEM_INDEX,
            inputClicked: false
        };
        this.handleOnClickOnItem = this.handleOnClickOnItem.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleOnSelectedItemIndex = this.handleOnSelectedItemIndex.bind(this);
        this.inputRef = null;
        this.setInputRef = element => { this.inputRef = element; };
    }

    static defaultProps = {
        inputClass: 'suggestion-input',
        inputPosition: 'start',
        suggestionListClass: 'suggestions-container',
        placeholder: 'Search...',
        recentSearches: [],
        minLength: 1,
        persistent: false,
        floatingLabel: false,
        autocompleteOnMatch: false, 
        maxSuggestions: MAXIMUM_SUGGESTIOMS_TO_SHOW
    }

    componentDidMount() {
        document.addEventListener(CLICK_EVENT, this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener(CLICK_EVENT, this.handleClickOutside);
    }

    componentDidUpdate(prevProps, prevState) {
        const { recentSearches } = this.state;
        const { persistent } = this.props;

        if (recentSearches !== prevState.recentSearches && persistent) {
            saveSearches(recentSearches);
        }
    }

    getSuggestionsFor(term) {
        const { minLength, maxSuggestions } = this.props;
        const { recentSearches } = this.state;
        const { length } = term;

        const normalizeStr = (str) => str.toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(DIACRITICS_REGEX, "");

        const includesTerm = (str, term) => normalizeStr(str).includes(normalizeStr(term));

        return minLength > length ? [] : recentSearches
            .filter((it) => includesTerm(it, term));
    }

    handleOnKeyPress(event) {
        const { keyCode } = event;
        const { suggestions, selectedItemIndex } = this.state;
        const { maxSuggestions } = this.props;
        const term = selectedItemIndex > NO_SELECTED_ITEM_INDEX ? suggestions[selectedItemIndex] : event.target.value;

        if (keyCode === ESCAPE_KEY_CODE) {
            this.setState(resetAndHideSuggestions);
        }

        if (keyCode === ENTER_KEY_CODE && term !== EMPTY_SEARCH_TERM) {
            this.submitSearch(term);
        }

        if (keyCode === DOWN_ARROW_KEY_CODE || keyCode === UP_ARROW_KEY_CODE) {
            const selectedItemIndex = this.selectItem(suggestions.length, keyCode);
            let listDOMElement = document.querySelector('.suggestions-container');

            this.setState(selectItemIndex(selectedItemIndex));
            if (listDOMElement) {
                if (selectItemIndex === FIRST_ELEMENT_INDEX) {
                    listDOMElement.scrollTop = 0;
                } else {
                    listDOMElement.scrollTop = DEFAULT_ROW_HEIGHT * (selectedItemIndex+1 - maxSuggestions);
                }
            }
            event.preventDefault();
        }

        if (keyCode === TAB_KEY_CODE && suggestions.length === SINGLE_SUGGESTION) {
            event.preventDefault();

            const autocompletedTerm = suggestions[FIRST_ELEMENT_INDEX];
            this.submitSearch(autocompletedTerm);
        }
    }

    handleOnSearch(event) {
        const term = event.target.value;
        const suggestions = this.getSuggestionsFor(term);
        const { autocompleteOnMatch } = this.props;

        if (autocompleteOnMatch && suggestions.length === SINGLE_SUGGESTION && suggestions[FIRST_ELEMENT_INDEX] === term) {
            this.submitSearch(term);
            return;
        }
        this.setState(establishSuggestionsForTerm(suggestions, term));
    }

    handleOnClickOnItem(event) {
        const term = event.target.innerText;
        this.submitSearch(term);
    }

    handleClickOutside(event) {
        if (!this.inputRef.contains(event.target)) {
            this.setState(hideSuggestions);
        }
    }

    handleOnSelectedItemIndex(selectedItemIndex) {
        this.setState(selectItemIndex(selectedItemIndex));
    }

    handleOnClickInputContainer() {
        this.setState({ inputClicked: true });
    }

    selectItem(itemsLength, shiftingType) {
        let { selectedItemIndex } = this.state;
        const nextSelectedItemIndex = shiftingType === DOWN_ARROW_KEY_CODE ? selectedItemIndex + 1 : selectedItemIndex - 1;

        if (nextSelectedItemIndex >= itemsLength) {
            return FIRST_ELEMENT_INDEX;
        }

        if (nextSelectedItemIndex < FIRST_ELEMENT_INDEX) {
            return itemsLength - 1;
        }
        return nextSelectedItemIndex;
    }

    submitSearch(term) {
        const { onSubmitFunction } = this.props;
        this.setState(addNewSearch(term));

        if (onSubmitFunction) {
            onSubmitFunction(term);
        } else {
            console.error('Submit function must be provided');
        }
    }

    render() {
        const { suggestions, showSuggestions, selectedItemIndex, inputClicked, term, lastItemSelected } = this.state;
        const { placeholder, inputClass, inputPosition, suggestionListClass, floatingLabel, maxSuggestions } = this.props;

        const containerClasses = `search-input-container ${inputPosition}`;
        const inputClasses = `${inputClass}`;
        const suggestionListClasses = `${suggestionListClass} ${inputPosition}`;
        const suggestionListHeightStyle = {
            maxHeight: DEFAULT_ROW_HEIGHT * maxSuggestions
        };

        return (
            <div className={containerClasses}>
                <div className="search-input-container__inner" onClick={() => this.handleOnClickInputContainer()}>
                    <FloatingLabel
                        floatingLabel={floatingLabel}
                        placeholder={placeholder}
                        isInputEmpty={term === EMPTY_TERM}
                        inputRef={this.inputRef}
                        inputContainerClicked={inputClicked} />
                    <input
                        type="text"
                        name="search"
                        value={term}
                        placeholder={floatingLabel ? '' : placeholder}
                        onChange={this.handleOnSearch}
                        onClick={this.handleOnSearch}
                        onKeyDown={this.handleOnKeyPress}
                        ref={this.setInputRef}
                        className={inputClasses}
                        autoComplete="off"
                    />
                    <SuggestionList
                        show={showSuggestions}
                        suggestions={suggestions}
                        onClickItem={this.handleOnClickOnItem}
                        onSelectedItemIndex={this.handleOnSelectedItemIndex}
                        selectedItemIndex={selectedItemIndex}
                        suggestionListClass={suggestionListClasses}
                        suggestionHeightStyle={suggestionListHeightStyle}
                        lastItemSelected={lastItemSelected}
                    />
                </div>
            </div>
        )
    }
}

export default SuggestionInputSearch;