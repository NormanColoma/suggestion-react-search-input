import React from 'react';
import SuggestionInputSearch from '../index';

// Enzyme for testing components
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;

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





