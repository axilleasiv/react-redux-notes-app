import * as defaultFolders from '../constants/folders';

/* const isNotArchived = archivedIds => note =>
  archivedIds.indexOf(note.id) === -1; */

const belongOnCurrentFolter = folder => note => {
  return note.folderId === folder.id;
}

const isNotDeleted = note => {
  return note.folderId !== defaultFolders.FOLDER_DELETED_ID;
};

const getNotes = ({ noteState, folderState }) => {
  const folder = folderState.active;

  if (folder.id === defaultFolders.FOLDER_ALL_ID) {
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
  return !(noteState.newNote ||
     folderState.active.id === defaultFolders.FOLDER_DELETED_ID);
};

const checkIfCanDelete = ({ folderState }) => {
  if (folderState.active.selected) {
    return !Object.values(defaultFolders).includes(folderState.active.id);
  }

  return true;
};

const getFetchError = ({ noteState }) => noteState.error;

export {
  getNotes,
  getActiveNote,
  getNextActiveNote,
  getFetchError,
  checkIfCanAddNewNote,
  checkIfCanDelete
};
