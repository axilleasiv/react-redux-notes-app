import {
  SEARCH,
  EDITOR_SEARCH,
  SEARCH_DOC_ENABLE,
  SEARCH_DOC_DISABLE,
  SEARCH_UPDATE_REPLACE,
  SEARCH_TOGGLE_REPLACE,
  EDITOR_REPLACE,
} from '../constants/actionTypes';

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

export {
  doUpdateReplace,
  doNewSearch,
  doReplace,
  doToggleReplace,
  doEnableDocSearch,
  doDisableDocSearch
};