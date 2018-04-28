import React from 'react';

import { CLICK_EVENT } from '../keyboard.constants';

class FloatingLabel extends React.Component {
    constructor(props) {
        super(props);

        this.floatingLabelRef = null;
    }

    componentDidUpdate() {
        const { inputContainerClicked } = this.props;

        if (inputContainerClicked) {
            this.focusElement();
        } else {
            this.removeFocus();
        }
    }

    removeFocus() {
        const { isInputEmpty, floatingLabel, inputContainerClicked } = this.props;

        if (isInputEmpty && floatingLabel && !inputContainerClicked) {
            this.floatingLabelRef.classList.remove('focus');
        }
        this.floatingLabelRef.classList.remove('focus-color');
    }

    focusElement() {
        const { floatingLabel } = this.props;

        if (floatingLabel) {
            this.floatingLabelRef.classList.add('focus', 'focus-color');
        }
    }

    render() {
        const { floatingLabel, placeholder } = this.props;

        if (!floatingLabel) {
            return null;
        }
        return <span
            className="search-input-container__title"
            ref={(floatingLabelRef) => { this.floatingLabelRef = floatingLabelRef }}>
            <label>{placeholder}</label>
        </span>
    }
}

export default FloatingLabel;