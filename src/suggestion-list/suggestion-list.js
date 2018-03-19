import React from 'react';
import './suggestion-list.css';

const SELECTED_CLASS = 'selected';
const EMPTY_CLASS = "";

const SuggestionList = ({ suggestions, onClickItem, onSelectedItemIndex, show, selectedItemIndex, suggestionListClass }) => {

    let suggestionListRef = null;

    const onMouseOver = (event) => {
        const childrenElems = suggestionListRef.children;
        const { target: element } = event;
        const { parentElement } = element;
        
        for(let index=0; index<childrenElems.length; index++) {
            const currentChildren = childrenElems[index];
            currentChildren.className = EMPTY_CLASS;
            if (element === currentChildren || parentElement === currentChildren) {
                currentChildren.className = SELECTED_CLASS;
                onSelectedItemIndex(index);
            }
        }
    }

    const suggestionList = suggestions.map((it, index) => {
        if (index === selectedItemIndex) {
            return <li key={it} 
                       className={SELECTED_CLASS} 
                       onClick={event => onClickItem(event)} 
                       onMouseOver={event => onMouseOver(event)}>
                       <span>{it}</span>
                    </li>;
        }
        return <li key={it} 
                   onClick={event => onClickItem(event)} 
                   onMouseOver={event => onMouseOver(event)}>
                  <span>{it}</span>
               </li>;
    });

    if (show) {
        return <div className={suggestionListClass}>
            <ul ref={(list) => { suggestionListRef = list; }}>
                {suggestionList}
            </ul>
        </div>;
    } 
    return null;
}

export default SuggestionList;