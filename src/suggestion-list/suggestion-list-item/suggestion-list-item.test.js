import React from 'react';
import SuggestionListItem from './suggestion-list-item';

// Enzyme for testing components
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should render suggestion list item whit empty class', () => {
    const suggestionListItem = shallow(<SuggestionListItem index={1}/>);

    expect(suggestionListItem.find('li').hasClass('')).toBeTruthy();
});

test('should render suggestion list item whit selected class', () => {
    const suggestionListItem = shallow(<SuggestionListItem />);

    expect(suggestionListItem.find('li').hasClass('selected')).toBeTruthy();
});

test('should call onClick fn when clicking an item', () => {
    const onClickFn = jest.fn();
    const suggestionListItem = shallow(<SuggestionListItem onClick={onClickFn}/>);

    suggestionListItem.simulate('click');
    expect(onClickFn.mock.calls.length).toBe(1);
});

test('should call onMouseOver fn when putting mouse over an item', () => {
    const onMouseOverFn = jest.fn();
    const suggestionListItem = shallow(<SuggestionListItem onMouseOver={onMouseOverFn}/>);

    suggestionListItem.simulate('mouseover');
    expect(onMouseOverFn.mock.calls.length).toBe(1);
});