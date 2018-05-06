import { combineReducers } from 'redux';
import noteReducer from './note';
import archiveReducer from './archive';
import folderReducer from './folder';
import editorReducer from './editor';
import searchReducer from './search';

const rootReducer = combineReducers({
  noteState: noteReducer,
  archiveState: archiveReducer,
  folderState: folderReducer,
  editorState: editorReducer,
  searchState: searchReducer,
});

export default rootReducer;
