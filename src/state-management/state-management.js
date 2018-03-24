const NO_SELECTED_ITEM_INDEX = -1;
const EMPTY_SUGGESTIONS = 0;

const addNewSearch = (term) => {
    return function update(state) {
        const { recentSearches } = this.state;
        const termNotFound = !recentSearches.includes(term);

        let newSearches = recentSearches;

        if (termNotFound) {
            newSearches = [...this.state.recentSearches, term];
        }

        return {
            showSuggestions: false, suggestions: [],
            recentSearches: newSearches, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX
        };
    }
}

const resetAndHideSuggestions = (state) => { 
    return { showSuggestions: false, suggestions: [], selectedItemIndex: NO_SELECTED_ITEM_INDEX }; 
}

const hideSuggestions = (state) =>{
    return { showSuggestions: false, selectedItemIndex: NO_SELECTED_ITEM_INDEX };
} 

const selectItemIndex = (selectedItemIndex) => {
    return function update(state) {
        return {
            selectedItemIndex
        }
    }
}

const establishSuggestionsForTerm = (suggestions, term) => {
    return function update(state) {
        if (suggestions.length > EMPTY_SUGGESTIONS) {
            return { showSuggestions: true, suggestions, term };
        }
        return { showSuggestions: false, suggestions, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX };
    }
}

export { addNewSearch, resetAndHideSuggestions, hideSuggestions, selectItemIndex, establishSuggestionsForTerm };