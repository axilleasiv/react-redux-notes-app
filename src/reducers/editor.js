import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
  SelectionState,
  Modifier
} from 'draft-js';
import {
  EDITOR_UPDATE,
  EDITOR_LOAD,
  EDITOR_NEW,
  EDITOR_SEARCH,
  EDITOR_REPLACE,
} from '../constants/actionTypes';
import React from 'react';

const INITIAL_STATE = {
  content: EditorState.createEmpty(),
  loaded: false
};

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start, end;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    callback(start, end);
  }
};

const SearchHighlight = props => (
  <span className="search-and-replace-highlight">{props.children}</span>
);

const generateDecorator = highlightTerm => {
  const regex = new RegExp(highlightTerm, 'g');
  return new CompositeDecorator([
    {
      strategy: (contentBlock, callback) => {
        if (highlightTerm !== '') {
          findWithRegex(regex, contentBlock, callback);
        }
      },
      component: SearchHighlight
    }
  ]);
};

const getFromRawContent = (rawContent) => {
  const parsedJson = JSON.parse(rawContent);
  return EditorState.createWithContent(convertFromRaw(parsedJson));
}

//TODO TODO check immutability
const applyUpdateState = (state, action) => ({
  ...state,
  content: action.content,
  loaded: true
});

const applyUpdateStateOnSearch = (state, action) => ({
  ...state,
  content: EditorState.set(state.content, {
    decorator: generateDecorator(action.term)
  })
});

const applyUpdateStateOnReplace = (state, action) => {

  const regex = new RegExp(action.search, 'g');
  const { content } = state;
  const selectionsToReplace = [];
  const blockMap = content.getCurrentContent().getBlockMap();

  blockMap.forEach(contentBlock =>
    findWithRegex(regex, contentBlock, (start, end) => {
      const blockKey = contentBlock.getKey();
      const blockSelection = SelectionState.createEmpty(blockKey).merge({
        anchorOffset: start,
        focusOffset: end
      });

      selectionsToReplace.push(blockSelection);
    })
  );

  let contentState = content.getCurrentContent();

  selectionsToReplace.forEach(selectionState => {
    contentState = Modifier.replaceText(contentState, selectionState, action.replace);
  });

  return {
    ...state,
    content: EditorState.push(
      content,
      contentState,
    )
  };
};

const applyLoadState = (state, action) => {
  const newContent = getFromRawContent(action.note.text);

  return {
    ...state,
    content: newContent,
    loaded: true
  }
}

const applyResetState = (state, action) => {
  return {
    content: EditorState.createEmpty(),
    loaded: true
  };
};

const editorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDITOR_UPDATE: {
      return applyUpdateState(state, action);
    }
    case EDITOR_SEARCH: {
      return applyUpdateStateOnSearch(state, action);
    }
    case EDITOR_REPLACE: {
      return applyUpdateStateOnReplace(state, action);
    }
    case EDITOR_LOAD: {
      return applyLoadState(state, action);
    }
    case EDITOR_NEW: {
      return applyResetState(state, action);
    }
    default:
      return state;
  }
};

export default editorReducer;
