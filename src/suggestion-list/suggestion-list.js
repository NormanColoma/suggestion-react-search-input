import React from 'react';
import './suggestion-list.scss';

// Components
import SuggestionListItem from './suggestion-list-item/suggestion-list-item';

// Constants
const EMPTY_CLASS = "";
const SELECTED_CLASS = 'selected';

class SuggestionList extends React.Component {

    constructor(props) {
        super(props);
        this.suggestionListRef = null;
        this.setSuggestionListRef = element => { this.suggestionListRef = element; };
    }

    onMouseOver(event) {
        const childrenElems = this.suggestionListRef.children;
        const { target: element } = event;
        const { parentElement } = element;

        for (let index = 0; index < childrenElems.length; index++) {
            const currentChildren = childrenElems[index];
            currentChildren.className = EMPTY_CLASS;
            this.setItemAsSelected(element, parentElement, currentChildren, index);
        }
    }

    setItemAsSelected(element, parentElement, currentItem, itemIndex) {
        const { onSelectedItemIndex } = this.props;

        if (element === currentItem || parentElement === currentItem) {
            currentItem.className = SELECTED_CLASS;
            onSelectedItemIndex(itemIndex);
        }
    }

    render() {
        const { show, suggestions, suggestionListClass, onClickItem, selectedItemIndex } = this.props;

        if (show) {
            const suggestionList = suggestions.map((it, index) => {
                return <SuggestionListItem
                    key={index}
                    index={index}
                    selectedItemIndex={selectedItemIndex}
                    item={it}
                    onClick={event => onClickItem(event)}
                    onMouseOver={event => this.onMouseOver(event)}
                />
            });

            return <div className={suggestionListClass}>
                <ul ref={this.setSuggestionListRef}>
                    {suggestionList}
                </ul>
            </div>;
        }
        return null;
    }
}

export default SuggestionList;