import uuidv4 from 'uuid/v4';
import {
  NOTE_SELECT,
  NOTE_DELETE,
  NOTES_DELETE_FROM_FOLDER,
  NOTE_NEW,
  NOTES_ADD,
  NOTE_CHANGE,
  NOTE_REMOVE_ACTIVE,
  NOTES_FETCH,
  NOTES_FETCH_ERROR,
  FOLDER_DESELECT,
  FOLDER_DELETE,
  NOTE_DESELECT,
  EDITOR_LOAD,
  EDITOR_NEW
} from '../constants/actionTypes';
import { getNextActiveNote, getActiveNote } from '../selectors/note';

const doNewNote = () => (dispatch, getState) => {
  dispatch({
    type: NOTE_NEW,
    id: uuidv4(),
    date: new Date().getTime(),
    folderId: getState().folderState.active.id
  });

  dispatch({
    type: EDITOR_NEW
  });
};

const doDeleteNote = () => (dispatch, getState) => {
  const activeFolder = getState().folderState.active;

  if (activeFolder.selected) {
    dispatch({
      type: FOLDER_DELETE
    });
    dispatch({
      type: NOTES_DELETE_FROM_FOLDER,
      folderId: activeFolder.id
    });
    const note = getNextActiveNote(getState());
    dispatch({
      type: NOTE_SELECT,
      note,
      selected: false
    });

    if (note && note.text) {
      dispatch({
        type: EDITOR_LOAD,
        note
      });
    }
  } else {
    dispatch({
      type: NOTE_DELETE,
      activeFolderId: activeFolder.id,
      onSearch: getState().toolsState.searchNotes.search
    });

    const note = getNextActiveNote(getState());

    if (note && note.text) {
      dispatch({
        type: EDITOR_LOAD,
        note
      });
    }
  }
};

const doSelectNote = note => (dispatch, getState) => {
  dispatch({
    type: NOTE_SELECT,
    note,
    selected: true,
    multiSelect: getState().toolsState.keys.shift
  });

  const active = getActiveNote(getState());

  if (active) {
    dispatch({
      type: EDITOR_LOAD,
      note: active
    });
  }

  dispatch({
    type: FOLDER_DESELECT
  });
};

const doDeselect = note => dispatch => {
  dispatch({
    type: NOTE_DESELECT
  });
  dispatch({
    type: FOLDER_DESELECT
  });
};

//maybe to move on Editor action
//or use a general action for doChangeNote(note)
const doChangeNote = (text, title, subtitle) => {
  return {
    type: NOTE_CHANGE,
    date: new Date().getTime(),
    text,
    title,
    subtitle
  };
};

const doRemoveActive = () => ({
  type: NOTE_REMOVE_ACTIVE
});

const doAddNotes = stories => ({
  type: NOTES_ADD,
  stories
});

const doFetchNotes = query => ({
  type: NOTES_FETCH,
  query
});

const doFetchErrorNotes = error => ({
  type: NOTES_FETCH_ERROR,
  error
});

export {
  doNewNote,
  doDeleteNote,
  doSelectNote,
  doChangeNote,
  doAddNotes,
  doFetchNotes,
  doFetchErrorNotes,
  doDeselect,
  doRemoveActive
};
