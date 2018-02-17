import { combineReducers } from 'redux';
import noteReducer from './note';
import archiveReducer from './archive';

const rootReducer = combineReducers({
  noteState: noteReducer,
  archiveState: archiveReducer
});

export default rootReducer;
