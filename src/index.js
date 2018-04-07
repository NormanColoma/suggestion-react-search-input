import React from 'react';
import PropTypes from 'prop-types';
import SuggestionList from './suggestion-list/suggestion-list';
import {
    addNewSearch, resetAndHideSuggestions, selectItemIndex, establishSuggestionsForTerm,
    hideSuggestions, loadSearches, saveSearches
} from './state-management/state-management';
import { ENTER_KEY_CODE, DOWN_ARROW_KEY_CODE, UP_ARROW_KEY_CODE, ESCAPE_KEY_CODE, CLICK_EVENT } from './keyboard.constants';
import './suggestion-input-search.css';

const EMPTY_SEARCH_TERM = "";
const EMPTY_TERM = '';
const EMPTY_SUGGESTIONS = 0;
const NO_SELECTED_ITEM_INDEX = -1;
const FIRST_ELEMENT_INDEX = 0;
const DIACRITICS_REGEX = /[\u0300-\u036f]/g;

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
            selectedItemIndex: NO_SELECTED_ITEM_INDEX
        };
        this.handleOnClickOnItem = this.handleOnClickOnItem.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleOnSelectedItemIndex = this.handleOnSelectedItemIndex.bind(this);
        this.inputRef = null;
    }

    static defaultProps = {
        inputClass: 'suggestion-input',
        inputPosition: 'start',
        suggestionListClass: 'suggestions-container',
        placeholder: 'Search...',
        recentSearches: [],
        minLength: 1,
        persistent: false
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
        const { minLength } = this.props;
        const { recentSearches } = this.state;
        const { length } = term;

        const normalizeStr = (str) => str.toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(DIACRITICS_REGEX, "");

        const includesTerm = (str, term) => normalizeStr(str).includes(normalizeStr(term));

        return minLength > length ? [] : recentSearches.filter(it => includesTerm(it, term));
    }

    handleOnKeyPress(event) {
        const { keyCode } = event;
        const { suggestions, selectedItemIndex } = this.state;
        const term = selectedItemIndex > NO_SELECTED_ITEM_INDEX ? suggestions[selectedItemIndex] : event.target.value;

        if (keyCode === ESCAPE_KEY_CODE) {
            this.setState(resetAndHideSuggestions);
        }

        if (keyCode === ENTER_KEY_CODE && term !== EMPTY_SEARCH_TERM) {
            this.submitSearch(term);
        }

        if (keyCode === DOWN_ARROW_KEY_CODE || keyCode === UP_ARROW_KEY_CODE) {
            const selectedItemIndex = this.selectItem(suggestions.length, keyCode);
            this.setState(selectItemIndex(selectedItemIndex));
            event.preventDefault();
        }
    }

    handleOnSearch(event) {
        const term = event.target.value;
        const suggestions = this.getSuggestionsFor(term);

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

        if ( onSubmitFunction) {
            onSubmitFunction(term);
        } else {
            console.error('Submit function must be provided');
        }
    }

    render() {
        const { suggestions, showSuggestions, selectedItemIndex } = this.state;
        const { placeholder, inputClass, inputPosition, suggestionListClass } = this.props;

        const containerClasses = `search-input-container ${inputPosition}`;
        const inputClasses = `${inputClass}`;
        const suggestionListClasses = `${suggestionListClass} ${inputPosition}`;

        return (
            <div className={containerClasses}>
                <input
                    type="text"
                    name="search"
                    placeholder={placeholder}
                    value={this.state.term}
                    onChange={this.handleOnSearch}
                    onClick={this.handleOnSearch}
                    onKeyDown={this.handleOnKeyPress}
                    ref={(input) => { this.inputRef = input }}
                    className={inputClasses}
                />
                <SuggestionList
                    show={showSuggestions}
                    suggestions={suggestions}
                    onClickItem={this.handleOnClickOnItem}
                    onSelectedItemIndex={this.handleOnSelectedItemIndex}
                    selectedItemIndex={selectedItemIndex}
                    suggestionListClass={suggestionListClasses}
                />
            </div>
        )
    }
}

export default SuggestionInputSearch;