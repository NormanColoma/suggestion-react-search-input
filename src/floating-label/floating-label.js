import React from 'react';

import { CLICK_EVENT } from '../keyboard.constants';

const FOCUS_CLASS = 'focus';
const FOCUS_COLOR_CLASS = 'focus-color';

class FloatingLabel extends React.Component {
    constructor(props) {
        super(props);

        this.floatingLabelRef = null;
        this.setFloatingLabelRef = element => { this.floatingLabelRef = element; };
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
            this.floatingLabelRef.classList.remove(FOCUS_CLASS);
        }

        if (floatingLabel) {
            this.floatingLabelRef.classList.remove(FOCUS_COLOR_CLASS);
        }
    }

    focusElement() {
        const { floatingLabel } = this.props;

        if (floatingLabel) {
            this.floatingLabelRef.classList.add(FOCUS_CLASS, FOCUS_COLOR_CLASS);
        }
    }

    render() {
        const { floatingLabel, placeholder } = this.props;

        if (!floatingLabel) {
            return null;
        }
        return <span
            className="search-input-container__title"
            ref={this.setFloatingLabelRef}>
            <label>{placeholder}</label>
        </span>
    }
}

export default FloatingLabel;