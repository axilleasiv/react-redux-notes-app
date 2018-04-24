import uuidv4 from 'uuid/v4';
import {
  FOLDER_SELECT,
  FOLDER_DELETE,
  FOLDER_NEW,
  FOLDER_SAVE,
  FOLDER_EDIT,
  NOTE_SELECT,
  NOTE_DESELECT,
} from '../constants/actionTypes';
import { getNextActiveNote } from '../selectors/note';

const doNewFolder = folder => ({
  type: FOLDER_NEW,
  id: uuidv4()
});

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