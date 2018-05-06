import {
  SEARCH,
  EDITOR_SEARCH,
  SEARCH_UPDATE_REPLACE,
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
})

const doReplace = () => (dispatch, getState) => {
  const { search, replace } = getState().searchState;
  dispatch({
    type: EDITOR_REPLACE,
    search,
    replace
  })
}

export {
  doUpdateReplace,
  doNewSearch,
  doReplace
};