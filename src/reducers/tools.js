import {
  SEARCH_DOC_ENABLE,
  SEARCH_DOC_DISABLE,
  SEARCH,
  SEARCH_UPDATE_REPLACE,
  SEARCH_TOGGLE_REPLACE,
  SEARCH_NOTES,
  SEARCH_NOTES_RESET,
  KEY_TOGGLE,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  searchDoc: {
    enabled: false,
    search: '',
    replace: '',
    replaceEnabled: false
  },
  searchNotes: {
    search: ''
  },
  keys: {
    shift: false
  }
};

const applyTriggerSearchDoc = (state, action) => {
  let enabled = true;
  if (action.type === 'SEARCH_DOC_DISABLE') {
    enabled = false;
  }

  return {
    ...state,
    searchDoc: {
      ...state.searchDoc,
      enabled
    }
  }
}

const applyNewSearch = (state, action) => {
  return {
    ...state,
    searchDoc: {
      ...state.searchDoc,
      search: action.term
    }
  }
};

const applyUpdateReplace = (state, action) => {
  return {
    ...state,
    searchDoc: {
      ...state.searchDoc,
      replace: action.term
    }
  };
};

const applyToggleReplace = (state, action) => {
  return {
    ...state,
    searchDoc: {
      ...state.searchDoc,
      replaceEnabled: !state.replaceEnabled
    }
  };
};

const applyChangeSearchNotes = (state, action) => {
  return {
    ...state,
    searchNotes: {
      ...state.searchNotes,
      search: action.term
    }
  };
}
;
const applySearchNotesReset = (state, action) => {
  return {
    ...state,
    searchNotes: {
      ...state.searchNotes,
      search: ''
    }
  };
};

const applyToggleKey = (state, action) => {
  return {
    ...state,
    keys: {
      ...state.keys,
      [action.name]: action.value
    }
  }
}

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KEY_TOGGLE: {
      return applyToggleKey(state, action);
    }
    case SEARCH_DOC_ENABLE:
    case SEARCH_DOC_DISABLE: {
      return applyTriggerSearchDoc(state, action);
    }
    case SEARCH: {
      return applyNewSearch(state, action);
    }
    case SEARCH_UPDATE_REPLACE: {
      return applyUpdateReplace(state, action);
    }
    case SEARCH_TOGGLE_REPLACE: {
      return applyToggleReplace(state, action);
    }
    case SEARCH_NOTES: {
      return applyChangeSearchNotes(state, action);
    }
    case SEARCH_NOTES_RESET: {
      return applySearchNotesReset(state, action);
    }
    default:
      return state;
  }
}

export default searchReducer;
