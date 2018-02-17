const isNotArchived = archivedIds => note =>
  archivedIds.indexOf(note.id) === -1;

const getReadableNotes = ({ noteState, archiveState }) =>
  noteState.notes.filter(isNotArchived(archiveState));

const getActiveNote = ({ noteState }) => noteState.active;

const getIfNewNote = ({ noteState }) => noteState.newNote;

const getFetchError = ({ noteState }) => noteState.error;

export { getReadableNotes, getActiveNote, getFetchError, getIfNewNote };
