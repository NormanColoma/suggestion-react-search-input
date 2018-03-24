import React from 'react';
import SuggestionList from './suggestion-list';

// Enzyme for testing components
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should render suggestion list when show property is true', () => {
    const suggestionList = shallow(<SuggestionList show={true} suggestionListClass="testClass" suggestions={[]} />);

    expect(suggestionList.contains(<div className='testClass' ><ul></ul></div>)).toBeTruthy();
});

test('should not render suggestion list when show property is false', () => {
    const suggestionList = shallow(<SuggestionList show={false} />);

    expect(suggestionList.contains(<div className='testClass' ><ul></ul></div>)).toBeFalsy();
});

test('should render suggestion list with one item', () => {
    const suggestionList = shallow(<SuggestionList show={true} suggestionListClass="testClass" suggestions={['star wars']} />);

    const expectedComponent = <li><span>star wars</span></li>;

    expect(suggestionList.find('ul').children().length).toBe(1);
    expect(suggestionList.containsMatchingElement(expectedComponent)).toBeTruthy();
});

test('should render suggestion list with one item selected and other one not selected', () => {
    const suggestions = ['star wars', 'star trek'];
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={suggestions} selectedItemIndex={0} />
    );

    const expectedSelectedComponent = <li className='selected'><span>star wars</span></li>;
    const expectedUnselectedComponent = <li><span>star trek</span></li>;

    expect(suggestionList.find('ul').children().length).toBe(2);
    expect(suggestionList.containsMatchingElement(expectedSelectedComponent)).toBeTruthy();
    expect(suggestionList.containsMatchingElement(expectedUnselectedComponent)).toBeTruthy();
});

test('should change selected class to second item in suggestion list when putting mouse over it', () => {
    const suggestions = ['star wars', 'star trek'];
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={suggestions} selectedItemIndex={0} />
    );
    const expectedUnselectedComponent = <li><span>star wars</span></li>;
    const list = document.createElement('ul');
    const firstElement = document.createElement('li');
    const secondElement = document.createElement('li');
    const firstSpanElement = document.createElement('span');
    const secondSpanElement = document.createElement('span');
    const firstElementText = document.createTextNode('star wars');
    const secondElementText = document.createTextNode('star trek');

    firstElement.className = 'selected';
    firstSpanElement.appendChild(firstElementText);
    secondSpanElement.appendChild(secondElementText);
    firstElement.appendChild(firstSpanElement);
    secondElement.appendChild(secondSpanElement);
    list.appendChild(firstElement).appendChild(secondElement);

    suggestionList.instance().suggestionListRef = list;

    const event = {
        target: {
            element: secondElement
        },
        parentElement: secondElement
    };

    suggestionList.find('ul').childAt(1).simulate('mouseover', event);

    expect(suggestionList.containsMatchingElement(expectedUnselectedComponent)).toBeTruthy();
});

test('should set item as selected and call onSelectedItemIndex when selecting item from suggestion list', () => {
    const suggestions = ['star wars', 'star trek'];
    const onSelectedItemIndex = jest.fn();
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={suggestions} selectedItemIndex={0}
            onSelectedItemIndex={onSelectedItemIndex}
        />
    );

    const itemBeingSelected = document.createElement('li');


    suggestionList.instance().setItemAsSelected(itemBeingSelected, itemBeingSelected, itemBeingSelected, 0);

    expect(onSelectedItemIndex.mock.calls.length).toBe(1);
});

test('should call onClickItem fn when clicking a item from suggestion list', () => {
    const onClickItem = jest.fn();
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={['star wars']} onClickItem={onClickItem} />
    );

    suggestionList.find('ul').childAt(0).simulate('click');
    expect(onClickItem.mock.calls.length).toBe(1);
});