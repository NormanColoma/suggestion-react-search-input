import React from 'react';
import FloatingLabel from './floating-label';

// Enzyme for testing components
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should call removeFocus fn when parent element is not clicked', () => {
    const floatingLabel = shallow(<FloatingLabel />);
    const removeFocusFnMock = jest.spyOn(floatingLabel.instance(), 'removeFocus').mockReturnValue({});
    const addFocusFnMock = jest.spyOn(floatingLabel.instance(), 'focusElement').mockReturnValue({});

    floatingLabel.setProps({
        inputContainerClicked: false
    })
    expect(removeFocusFnMock.mock.calls.length).toBe(1);
    expect(addFocusFnMock.mock.calls.length).toBe(0);
});

test('should call focusElement fn when parent element is clicked', () => {
    const floatingLabel = shallow(<FloatingLabel />);
    const removeFocusFnMock = jest.spyOn(floatingLabel.instance(), 'removeFocus').mockReturnValue({});
    const addFocusFnMock = jest.spyOn(floatingLabel.instance(), 'focusElement').mockReturnValue({});

    floatingLabel.setProps({
        inputContainerClicked: true
    });

    expect(removeFocusFnMock.mock.calls.length).toBe(0);
    expect(addFocusFnMock.mock.calls.length).toBe(1);
});

test('should focus component when it is floating', () => {
    const floatingLabel = shallow(<FloatingLabel floatingLabel={true} />);
    const addClassMock = jest.fn();
    floatingLabel.instance().floatingLabelRef = {
        classList: {
            add: addClassMock
        }
    };

    floatingLabel.instance().focusElement();

    expect(addClassMock.mock.calls.length).toBe(1);
});

test('should remove focus from component when it is floating', () => {
    const floatingLabel = shallow(<FloatingLabel floatingLabel={true} isInputEmpty={true} inputContainerClicked={false} />);
    const removeClassMock = jest.fn();
    floatingLabel.instance().floatingLabelRef = {
        classList: {
            remove: removeClassMock
        }
    };

    floatingLabel.instance().removeFocus();

    expect(removeClassMock.mock.calls.length).toBe(2);
});

test('should remove only focus color from component when it is floating and empty but parent element is clicked', () => {
    const floatingLabel = shallow(<FloatingLabel floatingLabel={true} isInputEmpty={true} inputContainerClicked={true} />);
    const removeClassMock = jest.fn();
    floatingLabel.instance().floatingLabelRef = {
        classList: {
            remove: removeClassMock
        }
    };

    floatingLabel.instance().removeFocus();

    expect(removeClassMock.mock.calls.length).toBe(1);
});

test('should return null when component is not floating', () => {
    const floatingLabel = shallow(<FloatingLabel floatingLabel={false} />);

    expect(floatingLabel.instance().render()).toBeNull();
});

test('should render component correctly', () => {
    const floatingLabel = shallow(<FloatingLabel floatingLabel={true} placeholder='star wars'/>);

    const expectedRenderedHtml = <span
        className="search-input-container__title">
        <label>star wars</label>
    </span>;

    expect(floatingLabel.containsMatchingElement(expectedRenderedHtml)).toBeTruthy();
})