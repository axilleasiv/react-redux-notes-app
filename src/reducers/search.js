import { SEARCH } from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyArchiveStory = (state, action) => [...state, action.id];

function archiveReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH: {
      return applyArchiveStory(state, action);
    }
    default:
      return state;
  }
}

export default archiveReducer;
