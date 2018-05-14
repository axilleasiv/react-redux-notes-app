import uuidv4 from 'uuid/v4';
import {
  FOLDER_SELECT,
  FOLDER_DELETE,
  FOLDER_NEW,
  FOLDER_SAVE,
  FOLDER_EDIT,
  NOTE_SELECT,
  NOTE_DESELECT,
  NOTE_REMOVE_ACTIVE,
  EDITOR_LOAD,
  SEARCH_NOTES_RESET,
} from '../constants/actionTypes';
import { getNextActiveNote } from '../selectors/note';

const doNewFolder = folder => dispatch => {
  dispatch({
    type: NOTE_REMOVE_ACTIVE
  });

  dispatch({
    type: SEARCH_NOTES_RESET
  });

  dispatch({
    type: FOLDER_NEW,
    id: uuidv4()
  });
} 

const doEditFolder = name => ({
  type: FOLDER_EDIT,
  name: name
});

const doSaveFolder = (name) => ({
  type: FOLDER_SAVE,
  name: name
});

const doDeleteFolder = folder => ({
  type: FOLDER_DELETE
});

const doSelectFolder = (folder) =>
  (dispatch, getState) => {
    const activeFolder = getState().folderState.active;

    dispatch({
      type: SEARCH_NOTES_RESET
    });

    dispatch({
      type: FOLDER_SELECT,
      folder
    });

    if (activeFolder.id !== folder.id) {
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
    } else {
      dispatch({type: NOTE_DESELECT});
    }

  }

export {
  doNewFolder,
  doEditFolder,
  doSaveFolder,
  doDeleteFolder,
  doSelectFolder,
};