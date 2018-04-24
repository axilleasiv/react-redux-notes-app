import {
  NOTE_SELECT,
  NOTE_DELETE,
  NOTE_NEW,
  NOTES_ADD,
  NOTE_CHANGE_TEXT,
  NOTES_FETCH,
  NOTES_FETCH_ERROR,
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

const doDeleteNote = note => ({
  type: NOTE_DELETE
});

const doSelectNote = note => ({
  type: NOTE_SELECT,
  note
});

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