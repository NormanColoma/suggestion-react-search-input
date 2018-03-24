const NO_SELECTED_ITEM_INDEX = -1;
const EMPTY_SUGGESTIONS = 0;

const addNewSearch = (term) => (state) => {
    const { recentSearches } = state;
    const termNotFound = !recentSearches.includes(term);

    const newSearches = termNotFound ? [...recentSearches, term] : recentSearches;

    return {
        showSuggestions: false, suggestions: [],
        recentSearches: newSearches, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX
    }
}

const resetAndHideSuggestions = (state) => {
    return { showSuggestions: false, suggestions: [], selectedItemIndex: NO_SELECTED_ITEM_INDEX };
}

const hideSuggestions = (state) => {
    return { showSuggestions: false, selectedItemIndex: NO_SELECTED_ITEM_INDEX };
}

const selectItemIndex = (selectedItemIndex) => (state) => ({ selectedItemIndex});

const establishSuggestionsForTerm = (suggestions, term) => (state) => {
    if (suggestions.length > EMPTY_SUGGESTIONS) {
        return { showSuggestions: true, suggestions, term };
    }
    return { showSuggestions: false, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX };
}

export { addNewSearch, resetAndHideSuggestions, hideSuggestions, selectItemIndex, establishSuggestionsForTerm };