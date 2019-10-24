import * as defaultFolders from '../constants/folders';

/* const isNotArchived = archivedIds => note =>
  archivedIds.indexOf(note.id) === -1; */

const belongOnCurrentFolder = folder => note => {
  return note.folderId === folder.id;
};

const isNotDeleted = note => {
  return note.folderId !== defaultFolders.FOLDER_DELETED_ID;
};

const mostRecent = (a, b) => b.editedAt - a.editedAt;

const getNotes = ({ noteState, folderState, toolsState }) => {
  const folder = folderState.active;

  if (toolsState.searchNotes.search !== '') {
    return noteState.searched.sort(mostRecent);
  }

  if (folder.id === defaultFolders.FOLDER_ALL_ID) {
    return noteState.notes.filter(isNotDeleted).sort(mostRecent);
  } else {
    return noteState.notes
      .filter(belongOnCurrentFolder(folder))
      .sort(mostRecent);
  }
};

// const getActiveNote = ({ noteState }) => noteState.active;
const getActiveNote = ({ noteState }) => {
  const active = noteState.active;

  if (active && active.length < 2) {
    return noteState.notes.find(note => {
      return note.id === noteState.active[0];
    });
  } else {
    return null;
  }
};

const getNextActiveNote = ({ noteState, folderState, toolsState }) => {
  let notes = getNotes({ noteState, folderState, toolsState });
  return notes.length > 0 ? notes[0] : null;
};

const checkIfCanAddNewNote = ({ noteState, folderState }) => {
  return !(
    (noteState.active && noteState.active.title === '') ||
    folderState.active.id === defaultFolders.FOLDER_DELETED_ID
  );
};

const checkIfCanDelete = ({ noteState, folderState, toolsState }) => {
  if (folderState.active.selected) {
    return !Object.values(defaultFolders).includes(folderState.active.id);
  }

  if (getNextActiveNote({ noteState, folderState, toolsState })) {
    return true;
  }

  return false;
};

const getFetchError = ({ noteState }) => noteState.error;

export {
  getNotes,
  getActiveNote,
  getNextActiveNote,
  getFetchError,
  checkIfCanAddNewNote,
  checkIfCanDelete,
  isNotDeleted
};
