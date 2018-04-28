import React from 'react';

class FloatingLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { floatingLabel } = this.props;
        
        if (!floatingLabel) {
            return null;
        }
        return  <span className="search-input-container__title" >
            <label>{placeholder}</label>
        </span>
    }
}

export default FloatingLabel;