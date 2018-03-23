import React from 'react';
import SuggestionInputSearch from '../index';

// Enzyme for testing components
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;

test('Should check default state', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);

    const defaultState = {
        selectedItemIndex: -1,
        showSuggestions: false,
        suggestions: [],
        term: "",
        recentSearches: []
    };

    expect(suggestionInputSearch.state()).toEqual(defaultState);
});

test('Should return empty array of suggestions when recentSearches is empty', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);

    const expectedSuggestions = [];
    expect(suggestionInputSearch.instance().getSuggestionsFor("star wars")).toEqual(expectedSuggestions);
});

test('Should return empty array of suggestions when entered term length is shorter than minLength', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch minLength={1} />);

    const expectedSuggestions = [];
    expect(suggestionInputSearch.instance().getSuggestionsFor("")).toEqual(expectedSuggestions);
});

test('Should return an array of suggestions when term entered match any term in recentSearches', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch recentSearches={['star wars']}/>);

    const expectedSuggestions = ['star wars'];
    expect(suggestionInputSearch.instance().getSuggestionsFor("star")).toEqual(expectedSuggestions);
});

test('Should return an array of suggestions when passed term entered match any term (caseinsensitive) in recentSearches', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch recentSearches={['star wars']}/>);

    const expectedSuggestions = ['star wars'];
    expect(suggestionInputSearch.instance().getSuggestionsFor("StAr")).toEqual(expectedSuggestions);
});

test('Should return 4th element in list of 5 elements when down arrow key pressed', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const suggestionsItemsLength = 5;
    const shiftingType = DOWN_ARROW_KEY_CODE;

    // Previous selected item index
    suggestionInputSearch.setState({selectedItemIndex: 3});

    expect(suggestionInputSearch.instance().selectItem(suggestionsItemsLength, shiftingType)).toEqual(4);
});

test('Should return 3rd element in list of 5 elements when up arrow key pressed', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const suggestionsItemsLength = 5;
    const shiftingType = UP_ARROW_KEY_CODE;

    // Previous selected item index
    suggestionInputSearch.setState({selectedItemIndex: 3});

    expect(suggestionInputSearch.instance().selectItem(suggestionsItemsLength, shiftingType)).toEqual(2);
});

test('Should return 1st element in list of 5 elements when down arrow key pressed and reached the end of the list', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const suggestionsItemsLength = 5;
    const shiftingType = DOWN_ARROW_KEY_CODE;

    // Previous selected item index
    suggestionInputSearch.setState({selectedItemIndex: 4});

    expect(suggestionInputSearch.instance().selectItem(suggestionsItemsLength, shiftingType)).toEqual(0);
});

test('Should return 1st element in list of 5 elements when up arrow key pressed and reached head of the list', () =>{
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const suggestionsItemsLength = 5;
    const shiftingType = UP_ARROW_KEY_CODE; 

    // Previous selected item index
    suggestionInputSearch.setState({selectedItemIndex: 0});

    expect(suggestionInputSearch.instance().selectItem(suggestionsItemsLength, shiftingType)).toEqual(4);
});

test('should call selectItem fn when down_arrow key is pressed', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const selectedItemIndex = 3;
    const spySelectItem = jest.spyOn(suggestionInputSearch.instance(), 'selectItem').mockReturnValue(selectedItemIndex);
    const spySubmitSearch = jest.spyOn(suggestionInputSearch.instance(), 'submitSearch').mockReturnValue(selectedItemIndex);
    const event = {
        keyCode: DOWN_ARROW_KEY_CODE, 
        target: { value: ""},
        preventDefault: () => {}
    };

    suggestionInputSearch.instance().handleOnKeyPress(event);
    expect(spySelectItem).toHaveBeenCalledTimes(1);
    expect(spySelectItem).toHaveBeenCalledWith(0, DOWN_ARROW_KEY_CODE);
    expect(spySubmitSearch).toHaveBeenCalledTimes(0);
    expect(suggestionInputSearch.state().selectedItemIndex).toBe(selectedItemIndex);
});

test('should call selectItem fn when up_arrow key is pressed', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const selectedItemIndex = 3;
    const spy = jest.spyOn(suggestionInputSearch.instance(), 'selectItem').mockReturnValue(selectedItemIndex);
    const event = {
        keyCode: UP_ARROW_KEY_CODE, 
        target: { value: ""},
        preventDefault: () => {}
    };

    suggestionInputSearch.instance().handleOnKeyPress(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(suggestionInputSearch.state().selectedItemIndex).toBe(selectedItemIndex);
});

test('should call submitSearch fn when enter_key is pressed and term is not empty', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const spy = jest.spyOn(suggestionInputSearch.instance(), 'submitSearch').mockReturnValue({});
    const event = {
        keyCode: ENTER_KEY_CODE, 
    };
    const initialState = { selectedItemIndex: 0 , suggestions: ['star wars'] };
    suggestionInputSearch.setState(initialState);

    suggestionInputSearch.instance().handleOnKeyPress(event);

    expect(spy).toHaveBeenCalledWith('star wars');
});

test('should call setState fn and hide suggestionList when escape_key is pressed', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const event = {
        keyCode: ESCAPE_KEY_CODE, 
    };
    const showSuggestions = true;
    const recentSearches = ['star wars'];
    const suggestions = ['star wars'];
    const term = 'star';
    const selectedItemIndex = 0;

    suggestionInputSearch.setState({
        showSuggestions,
        recentSearches,
        suggestions,
        term,
        selectedItemIndex
    });

    suggestionInputSearch.instance().handleOnKeyPress(event);

    const expectedState = {
        showSuggestions: false, suggestions: [] , term, recentSearches, selectedItemIndex: -1
    }
    expect(suggestionInputSearch.state()).toEqual(expectedState)
});

test('should call submitSearch fn when clicking item from suggestion list', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const term = 'star wars';
    const spy = jest.spyOn(suggestionInputSearch.instance(), 'submitSearch').mockReturnValue({});
    const event = {
        target: {
            innerText: term
        }, 
    };

    suggestionInputSearch.instance().handleOnClickOnItem(event);

    expect(spy).toHaveBeenCalledWith(term);
    expect(spy).toHaveBeenCalledTimes(1);
});

test('should call setState when getting at least one suggestion when searching', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const term = 'star wars';
    const spy = jest.spyOn(suggestionInputSearch.instance(), 'getSuggestionsFor').mockReturnValue([term]);
    const event = {
        target: {
            value: term
        }, 
    };

    suggestionInputSearch.instance().handleOnSearch(event);

    expect(spy).toHaveBeenCalledWith(term);
    expect(spy).toHaveBeenCalledTimes(1);

    const expectedState = {
        showSuggestions: true, suggestions: ['star wars'], term, recentSearches: [], selectedItemIndex: -1
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});

test('should call setState when getting any suggestion when searching', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const term = 'star wars';
    const spy = jest.spyOn(suggestionInputSearch.instance(), 'getSuggestionsFor').mockReturnValue([]);
    const event = {
        target: {
            value: term
        }, 
    };

    suggestionInputSearch.instance().handleOnSearch(event);

    expect(spy).toHaveBeenCalledWith(term);
    expect(spy).toHaveBeenCalledTimes(1);

    const expectedState = {
        showSuggestions: false, suggestions: [], term, recentSearches: [], selectedItemIndex: -1
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});

test('should call setState when selecting item index', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const selectedItemIndex = 1;

    suggestionInputSearch.instance().handleOnSelectedItemIndex(selectedItemIndex);

    const expectedState = {
        showSuggestions: false, suggestions: [], term: "", recentSearches: [], selectedItemIndex
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});

test('should call setState when clicking outside the component', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const event = {
        target: {}, 
    };

    suggestionInputSearch.instance().inputRef = { 
        contains: () => false
    };
    suggestionInputSearch.instance().handleClickOutside(event);

    const expectedState = {
        showSuggestions: false, suggestions: [], term:"", recentSearches: [], selectedItemIndex: -1
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});

test('should not call setState when clicking inside the component', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch />);
    const event = {
        target: {}, 
    };
    const showSuggestions = true;
    const selectedItemIndex = 2;

    suggestionInputSearch.setState({
        showSuggestions,
        selectedItemIndex
    });
    suggestionInputSearch.instance().inputRef = { 
        contains: () => true
    };;

    suggestionInputSearch.instance().handleClickOutside(event);

    const expectedState = {
        showSuggestions, suggestions: [], term:"", recentSearches: [], selectedItemIndex
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});

test('should call setState when submiting the component and term passed not found', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch onSubmitFunction={() => {}}/>);
    const term = 'star wars';
    const recentSearches = ['star'];

    suggestionInputSearch.setState({
        recentSearches
    });

    suggestionInputSearch.instance().submitSearch(term);

    const expectedState = {
        showSuggestions: false, suggestions: [], term, recentSearches: ['star', term], selectedItemIndex: -1
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});

test('should call setState when submiting the component and term passed found', () => {
    const suggestionInputSearch = shallow(<SuggestionInputSearch onSubmitFunction={() => {}}/>);
    const term = 'star wars';
    const recentSearches = [term];

    suggestionInputSearch.setState({
        recentSearches
    });

    suggestionInputSearch.instance().submitSearch(term);

    const expectedState = {
        showSuggestions: false, suggestions: [], term, recentSearches: [term], selectedItemIndex: -1
    };
    expect(suggestionInputSearch.state()).toEqual(expectedState);
});




