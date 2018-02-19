import { combineReducers } from 'redux';
import noteReducer from './note';
import archiveReducer from './archive';
import folderReducer from './folder';

const rootReducer = combineReducers({
  noteState: noteReducer,
  archiveState: archiveReducer,
  folderState: folderReducer,
});

export default rootReducer;
