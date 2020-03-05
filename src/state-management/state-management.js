const NO_SELECTED_ITEM_INDEX = -1;
const EMPTY_SUGGESTIONS = 0;
import { loadSearches, saveSearches } from './local-storage/local.storage';

const addNewSearch = (term) => (state) => {
    const { recentSearches } = state;
    const termNotFound = !recentSearches.includes(term);

    const newSearches = termNotFound ? [...recentSearches, term] : recentSearches;
    const lastItemSelected = term;

    return {
        showSuggestions: false, suggestions: [],
        recentSearches: newSearches, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX,
        lastItemSelected
    }
}

const resetAndHideSuggestions = (state) => {
    const { lastItemSelected, term } = state;
    const newTerm = lastItemSelected ? lastItemSelected : term;

    return { showSuggestions: false, suggestions: [], term: newTerm, selectedItemIndex: NO_SELECTED_ITEM_INDEX };
}

const hideSuggestions = (state) => {
    const { lastItemSelected, term } = state;
    const newTerm = lastItemSelected ? lastItemSelected : term;

    return { showSuggestions: false, term: newTerm, selectedItemIndex: NO_SELECTED_ITEM_INDEX, inputClicked: false };
}

const selectItemIndex = (selectedItemIndex) => (state) => ({ selectedItemIndex });

const establishSuggestionsForTerm = (suggestions, term) => (state) => {
    if (suggestions.length > EMPTY_SUGGESTIONS) {
        return { showSuggestions: true, suggestions, term };
    }
    return { showSuggestions: false, term, selectedItemIndex: NO_SELECTED_ITEM_INDEX };
}

export { addNewSearch, resetAndHideSuggestions, hideSuggestions, selectItemIndex, establishSuggestionsForTerm, loadSearches, saveSearches };