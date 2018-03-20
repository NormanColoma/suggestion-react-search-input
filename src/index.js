import React from 'react';
import PropTypes from 'prop-types';
import SuggestionList from './suggestion-list/suggestion-list';
import './suggestion-input-search.css';

const EMPTY_SEARCH_TERM = "";
const EMPTY_TERM = '';
const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const EMPTY_SUGGESTIONS = 0;
const NO_SELECTED_ITEM_INDEX = -1;
const CLICK_EVENT = 'click';
const FIRST_ELEMENT_INDEX = 0;

class SuggestionInputSearch extends React.Component {
    constructor(props) {
        super(props);

        const { inputClass, suggestionListClass, inputPosition } = props;
        this.state = {
            showSuggestions: false,
            suggestions: [],
            recentSearches: this.props.recentSearches,
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
        recentSearches: []
    }

    componentDidMount() {
        document.addEventListener(CLICK_EVENT, this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener(CLICK_EVENT, this.handleClickOutside);
    }

    submitSearch(term) {
        const { onSubmitFunction } = this.props;
        const { recentSearches } = this.state;
        onSubmitFunction(term);

        const termNotFound = !recentSearches.includes(term);
        let newSearches = recentSearches;

        if (termNotFound) {
            newSearches = [...this.state.recentSearches, term];
        }

        this.setState({
            showSuggestions: false, suggestions: [],
            recentSearches: newSearches, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX
        });
    }

    handleOnKeyPress(event) {
        const { keyCode } = event;
        const { suggestions, selectedItemIndex } = this.state;
        const term = selectedItemIndex > NO_SELECTED_ITEM_INDEX ? suggestions[selectedItemIndex] : event.target.value;

        if (keyCode === ENTER_KEY_CODE && term !== EMPTY_SEARCH_TERM) {
            this.submitSearch(term);
        }

        if (keyCode === DOWN_ARROW_KEY_CODE || keyCode === UP_ARROW_KEY_CODE) {
            const selectedItemIndex = this.selectItem(suggestions, keyCode);
            this.setState({ selectedItemIndex });
            event.preventDefault();
        }
    }

    selectItem(items, shiftingType) {
        let { selectedItemIndex } = this.state;
        const nextSelectedItemIndex = shiftingType === DOWN_ARROW_KEY_CODE ? selectedItemIndex + 1 : selectedItemIndex - 1;

        if (nextSelectedItemIndex >= items.length) {
            return FIRST_ELEMENT_INDEX;
        }

        if (nextSelectedItemIndex < FIRST_ELEMENT_INDEX) {
            return items.length - 1;
        }
        return nextSelectedItemIndex;
    }

    handleOnSearch(event) {
        const term = event.target.value;
        const suggestions = this.getSuggestionsFor(term);

        if (suggestions.length > EMPTY_SUGGESTIONS) {
            this.setState({ showSuggestions: true, suggestions, term });
        } else {
            this.setState({ showSuggestions: false, suggestions, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX });
        }
    }

    getSuggestionsFor(term) {
        const { recentSearches } = this.state;
        return term !== EMPTY_SEARCH_TERM ? recentSearches.filter(it => it.toLowerCase().includes(term.toLowerCase())) : [];
    }

    handleOnClickOnItem(event) {
        const term = event.target.innerText;
        this.submitSearch(term);
    }

    handleClickOutside(event) {
        if (!this.inputRef.contains(event.target)) {
            this.setState({ showSuggestions: false, selectedItemIndex: NO_SELECTED_ITEM_INDEX });
        }
    }

    handleOnSelectedItemIndex(selectedItemIndex) {
        this.setState({ selectedItemIndex });
    }

    render() {
        const { suggestions, showSuggestions, selectedItemIndex } = this.state;
        const { placeholder, inputClass, inputPosition, suggestionListClass } = this.props;

        const inputClasses = `${inputClass} ${inputPosition}`;
        const suggestionListClasses = `${suggestionListClass} ${inputPosition}`;

        return (
            <div>
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