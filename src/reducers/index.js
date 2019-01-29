import { combineReducers } from 'redux';
import noteReducer from './note';
import archiveReducer from './archive';
import folderReducer from './folder';
import editorReducer from './editor';
import toolsReducer from './tools';

const rootReducer = combineReducers({
  noteState: noteReducer,
  archiveState: archiveReducer,
  folderState: folderReducer,
  editorState: editorReducer,
  toolsState: toolsReducer
});

export default rootReducer;
