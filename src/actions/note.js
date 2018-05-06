import uuidv4 from 'uuid/v4';
import {
  NOTE_SELECT,
  NOTE_DELETE,
  NOTES_DELETE_FROM_FOLDER,
  NOTE_NEW,
  NOTES_ADD,
  NOTE_CHANGE,
  NOTES_FETCH,
  NOTES_FETCH_ERROR,
  FOLDER_DESELECT,
  FOLDER_DELETE,
  NOTE_DESELECT,
} from "../constants/actionTypes";
import { getNextActiveNote } from '../selectors/note';

const doNewNote = () =>
  (dispatch, getState) =>
    dispatch({
      type: NOTE_NEW,
      id: uuidv4(),
      date: new Date().getTime(),
      folderId: getState().folderState.active.id
    })

const doDeleteNote = () =>
  (dispatch, getState) => {
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
    } else {
      
      dispatch({
        type: NOTE_DELETE
      });

    }
  }

const doSelectNote = note =>
  (dispatch) => {
    dispatch({
      type: NOTE_SELECT,
      note,
      selected: true
    })

    dispatch({
      type: FOLDER_DESELECT
    })
  }

const doDeselect = note =>
  (dispatch) => {
    dispatch({
      type: NOTE_DESELECT,
    });
    dispatch({
      type: FOLDER_DESELECT
    })
  }

//maybe to move on Editor action
//or use a general action for doChangeNote(note)
const doChangeNote = (text, title, subtitle) => {
  return ({
    type: NOTE_CHANGE,
    date: new Date().getTime(),
    text,
    title,
    subtitle
  })
};

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
};