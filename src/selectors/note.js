import { FOLDER_DELETED_ID} from '../constants/folders';

/* const isNotArchived = archivedIds => note =>
  archivedIds.indexOf(note.id) === -1; */

const belongOnCurrentFolter = active => folder => {
  return folder.belongs === active.id;
}

const isNotDeleted = folder => {
  return folder.belongs !== FOLDER_DELETED_ID;
};

const getNotes = ({ noteState, folderState }) => {
  const active = folderState.active;

  if (active.id === 1) {
    return noteState.notes.filter(isNotDeleted);
  } else {
    return noteState.notes.filter(belongOnCurrentFolter(active));
  }
}

const getActiveNote = ({ noteState }) => noteState.active;

const checkIfCanAddNewNote = ({ noteState, folderState }) => {
  if (noteState.newNote || folderState.active.id === FOLDER_DELETED_ID) {
    return false;
  }

  return true;
};

const getFetchError = ({ noteState }) => noteState.error;

export { getNotes, getActiveNote, getFetchError, checkIfCanAddNewNote };
