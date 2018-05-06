import { SEARCH, SEARCH_UPDATE_REPLACE } from '../constants/actionTypes';

const INITIAL_STATE = {
  search: '',
  replace: ''
};

const applyNewSearch = (state, action) => {
  return {
    ...state,
    search: action.term
  }
};

const applyUpdateReplace = (state, action) => {
  return {
    ...state,
    replace: action.term
  };
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH: {
      return applyNewSearch(state, action);
    }
    case SEARCH_UPDATE_REPLACE: {
      return applyUpdateReplace(state, action);
    }
    default:
      return state;
  }
}

export default searchReducer;
