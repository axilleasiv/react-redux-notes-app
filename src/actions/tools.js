import {
  SEARCH,
  EDITOR_SEARCH,
  SEARCH_DOC_ENABLE,
  SEARCH_DOC_DISABLE,
  SEARCH_UPDATE_REPLACE,
  SEARCH_TOGGLE_REPLACE,
  SEARCH_NOTES,
  EDITOR_REPLACE,
  EDITOR_LOAD,
  NOTE_SELECT,
  NOTES_ON_SEARCH,
} from '../constants/actionTypes';
import { getNextActiveNote } from '../selectors/note';

const doNewSearch = term => (dispatch, getState) => {
  dispatch({
    type: SEARCH,
    term
  });

  dispatch({
    type: EDITOR_SEARCH,
    term
  });
}

const doUpdateReplace = term => ({
  type: SEARCH_UPDATE_REPLACE,
  term
});

const doToggleReplace = term => ({
  type: SEARCH_TOGGLE_REPLACE
});

const doReplace = () => (dispatch, getState) => {
  const { search, replace } = getState().toolsState.searchDoc;
  dispatch({
    type: EDITOR_REPLACE,
    search,
    replace
  })
}

const doEnableDocSearch = () => ({
  type: SEARCH_DOC_ENABLE
})

const doDisableDocSearch = () => ({
  type: SEARCH_DOC_DISABLE
});

const doSearchNotes = term =>
  (dispatch, getState) => {
    dispatch({
      type: SEARCH_NOTES,
      term
    });

    dispatch({
      type: NOTES_ON_SEARCH,
      term
    });

    const note = getNextActiveNote(getState());

    dispatch({
      type: NOTE_SELECT,
      note,
      selected: false
    });

    if (note) {
      dispatch({
        type: EDITOR_LOAD,
        note
      })
    }

  }
  

export {
  doUpdateReplace,
  doNewSearch,
  doReplace,
  doToggleReplace,
  doEnableDocSearch,
  doDisableDocSearch,
  doSearchNotes
};