import React from 'react';

const SELECTED_CLASS = 'selected';
const LAST_SELECTED_CLASS = 'bold'
const EMPTY_CLASS = "";

const SuggestionListItem = ({ index, selectedItemIndex, item, lastItemSelected, onClick, onMouseOver }) => {
    let className = index === selectedItemIndex ? SELECTED_CLASS : EMPTY_CLASS;

    if (item === lastItemSelected) {
        className += ' ' + LAST_SELECTED_CLASS;
    }

    return <li
        className={className}
        onClick={event => onClick(event)}
        onMouseOver={event => onMouseOver(event)}>
        <span>{item}</span>
    </li>;
};

export default SuggestionListItem;