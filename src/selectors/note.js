import { FOLDER_DELETED_ID, FOLDER_ALL_ID} from '../constants/folders';

/* const isNotArchived = archivedIds => note =>
  archivedIds.indexOf(note.id) === -1; */

const belongOnCurrentFolter = active => folder => {
  return folder.belongs === active.id;
}

const isNotDeleted = folder => {
  return folder.belongs !== FOLDER_DELETED_ID;
};

const getNotes = ({ noteState, folderState }) => {
  const folder = folderState.active;

  if (folder.id === FOLDER_ALL_ID) {
    return noteState.notes.filter(isNotDeleted);
  } else {
    return noteState.notes.filter(belongOnCurrentFolter(folder));
  }
}

const getActiveNote = ({ noteState }) => noteState.active;

const getNextActiveNote = ({ noteState, folderState }) => {
  let notes = getNotes({ noteState, folderState });
  return notes.length > 0 ? notes[0] : null;
};

const checkIfCanAddNewNote = ({ noteState, folderState }) => {
  if (noteState.newNote || folderState.active.id === FOLDER_DELETED_ID) {
    return false;
  }

  return true;
};

const getFetchError = ({ noteState }) => noteState.error;

export { getNotes, getActiveNote, getNextActiveNote, getFetchError, checkIfCanAddNewNote };
