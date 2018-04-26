import React from 'react';

const SELECTED_CLASS = 'selected';
const EMPTY_CLASS = "";

const SuggestionListItem = ({ index, selectedItemIndex, item, onClick, onMouseOver }) => {
    const className = index === selectedItemIndex ? SELECTED_CLASS : EMPTY_CLASS;
    return <li
        className={className}
        onClick={event => onClick(event)}
        onMouseOver={event => onMouseOver(event)}>
        <span>{item}</span>
    </li>;
};

export default SuggestionListItem;