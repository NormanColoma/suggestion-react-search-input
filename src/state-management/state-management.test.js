import { addNewSearch, resetAndHideSuggestions, hideSuggestions, selectItemIndex, establishSuggestionsForTerm } from './state-management';

test('should add new term to recentSearches when term not found', () => {
    const term = 'star wars';
    const setStateFn = addNewSearch(term);

    const initialState = {
        showSuggestions: false,
        suggestions: [],
        recentSearches: [],
        selectedItemIndex: -1,
        term: ""
    };

    const expectedState = Object.assign({}, initialState, { term, recentSearches: [term] });

    expect(setStateFn(initialState)).toEqual(expectedState);
});

test('should not add new term to recentSearches when term found', () => {
    const term = 'star wars';
    const setStateFn = addNewSearch(term);

    const initialState = {
        showSuggestions: false,
        suggestions: [],
        recentSearches: [term],
        selectedItemIndex: -1,
        term: ""
    };
    const expectedState = Object.assign({}, initialState, { term });

    expect(setStateFn(initialState)).toEqual(expectedState);
});

test('should reset and hide suggestions from state', () => {
    const term = 'star wars';
    const initialState = {
        showSuggestions: true,
        suggestions: [term],
        selectedItemIndex: -1
    };

    const expectedState = { suggestions: [], selectedItemIndex: -1, showSuggestions: false };

    expect(resetAndHideSuggestions(initialState)).toEqual(expectedState);
});

test('should hide suggestions', () => {
    const initialState = { showSuggestions: true, selectedItemIndex: 0, inputClicked: true };
    const expectedState = { showSuggestions: false, selectedItemIndex: -1, inputClicked: false };

    expect(hideSuggestions(initialState)).toEqual(expectedState);
});

test('should change selectedItemIndex', () => {
    const initialState = { selectedItemIndex: 0 };
    const expectedState = { selectedItemIndex: 1 };
    const setStateFn = selectItemIndex(1);

    expect(setStateFn(initialState)).toEqual(expectedState);
});

test('should establish suggestions that match given term and show them', () => {
    const suggestions = ['star wars'];
    const term = 'star wars';

    const initialState = { showSuggestions: false, suggestions: [], term: "" };
    
    const setStateFn = establishSuggestionsForTerm(suggestions, term);
    const expectedState = { showSuggestions: true, suggestions, term };

    expect(setStateFn(initialState)).toEqual(expectedState);
    
});

test('should establish suggestions and term, but not showing them because does not match term passed', () => {
    const suggestions = [];
    const term = 'shutter island';

    const initialState = { showSuggestions: false, suggestions: [], term: "" };
    
    const setStateFn = establishSuggestionsForTerm(suggestions, term);
    const expectedState = { showSuggestions: false, term, selectedItemIndex: -1 };

    expect(setStateFn(initialState)).toEqual(expectedState);
    
});