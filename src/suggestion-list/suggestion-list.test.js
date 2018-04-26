import React from 'react';
import SuggestionList from './suggestion-list';
import SuggestionListItem from './suggestion-list-item/suggestion-list-item';

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

    const expectedComponent = <SuggestionListItem />;

    expect(suggestionList.find('ul').children().length).toBe(1);
    expect(suggestionList.find('SuggestionListItem').length).toBe(1);
});

test('should render suggestion list with two elements', () => {
    const suggestions = ['star wars', 'star trek'];
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={suggestions} selectedItemIndex={0} />
    );

    const expectedSelectedComponent = <li className='selected'><span>star wars</span></li>;
    const expectedUnselectedComponent = <li><span>star trek</span></li>;

    expect(suggestionList.find('ul').children().length).toBe(2);
});

test('should change selected class to second item in suggestion list when putting mouse over it', () => {
    const suggestions = ['star wars', 'star trek'];
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={suggestions} selectedItemIndex={0} />
    );
    const expectedUnselectedComponent = <li className=""><span>star wars</span></li>;
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

    suggestionList.find('SuggestionListItem').at(1).simulate('mouseover', event);

    expect(suggestionList.find('SuggestionListItem').at(1).hasClass('selected')).toBeFalsy();
});

test('should call onMouseOver fn when putting the mouse over selected item', () => {
    const onMouseOverMock = jest.fn();
    const suggestions = ['star wars', 'star trek'];
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass" suggestions={suggestions} selectedItemIndex={0} />
    );

    suggestionList.instance().onMouseOver = onMouseOverMock;
    suggestionList.find('ul').childAt(0).simulate('mouseover');

    expect(onMouseOverMock.mock.calls.length).toBe(1);
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

    suggestionList.find('SuggestionListItem').simulate('click');
    expect(onClickItem.mock.calls.length).toBe(1);
});

test('should call onClickItem fn when clicking a item selected from suggestion list', () => {
    const onClickItem = jest.fn();
    const suggestionList = shallow(
        <SuggestionList show={true} suggestionListClass="testClass"
             suggestions={['star wars']} onClickItem={onClickItem} selectedItemIndex={0}/>
    );

    suggestionList.find('ul').childAt(0).simulate('click');
    expect(onClickItem.mock.calls.length).toBe(1);
});