import React from 'react';
import './suggestion-list.css';

const SELECTED_CLASS = 'selected';
const EMPTY_CLASS = "";

class SuggestionList extends React.Component {

    constructor(props) {
        super(props);
        this.suggestionListRef = null;
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
                if (index === selectedItemIndex) {
                    return <li key={it}
                        className={SELECTED_CLASS}
                        onClick={event => onClickItem(event)}
                        onMouseOver={event => this.onMouseOver(event)}>
                        <span>{it}</span>
                    </li>;
                }
                return <li key={it}
                    onClick={event => onClickItem(event)}
                    onMouseOver={event => this.onMouseOver(event)}>
                    <span>{it}</span>
                </li>;
            });

            return <div className={suggestionListClass}>
                <ul ref={(list) => { this.suggestionListRef = list; }}>
                    {suggestionList}
                </ul>
            </div>;
        }
        return null;
    }
}

export default SuggestionList;