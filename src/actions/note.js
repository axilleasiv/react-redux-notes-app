import {
  NOTE_SELECT,
  NOTE_DELETE,
  NOTES_DELETE_FROM_FOLDER,
  NOTE_NEW,
  NOTES_ADD,
  NOTE_CHANGE_TEXT,
  NOTES_FETCH,
  NOTES_FETCH_ERROR,
  FOLDER_DESELECT,
  FOLDER_DELETE,
} from "../constants/actionTypes";
import uuidv4 from 'uuid/v4';

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

//maybe to move on Editor action
//or use a general action for doChangeNote(note)
const doChangeNoteText = text => {
  return ({
  type: NOTE_CHANGE_TEXT,
  date: new Date().getTime(),
  text
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
  doChangeNoteText,
  doAddNotes,
  doFetchNotes,
  doFetchErrorNotes,
};