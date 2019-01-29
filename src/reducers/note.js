import {
  NOTES_ADD,
  NOTE_SELECT,
  NOTE_DESELECT,
  NOTES_FETCH_ERROR,
  NOTE_CHANGE,
  NOTE_NEW,
  NOTE_DELETE,
  NOTES_DELETE_FROM_FOLDER,
  NOTE_REMOVE_ACTIVE,
  NOTES_ON_SEARCH
} from '../constants/actionTypes';
import {
  FOLDER_ALL_ID,
  FOLDER_NOTES_ID,
  FOLDER_DELETED_ID
} from '../constants/folders';
//TODO
const INITIAL_STATE = {};

console.log('test');

const applyAddNotes = (state, action) => ({
  notes: action.notes,
  error: null,
  active: null
});

const isNotNewNote = note => note.title !== '';
const applySelectNote = (state, action) => {
  let active;
  if (!action.note) {
    active = null;
  } else if (action.multiSelect) {
    active = [...state.active, action.note.id];
  } else {
    active = [action.note.id];
  }

  return {
    ...state,
    //TODO use if else without assign
    notes: action.note
      ? state.notes.filter(isNotNewNote).map(note => {
          return {
            ...note,
            selected: active.includes(note.id) ? action.selected : false
          };
        })
      : state.notes,
    active: action.note ? active : null
  };
};

const applyRemoveActiveNote = (state, action) => ({
  ...state,
  notes: state.notes.filter(isNotNewNote),
  active: null
});

const applyDeSelectNote = (state, action) => ({
  ...state,
  notes: state.notes.map(note => {
    note.selected = false;
    return note;
  })
});

const applyNewNote = (state, action) => {
  const note = {
    id: action.id,
    title: '',
    subtitle: '',
    text: '',
    createdAt: action.date,
    editedAt: action.date,
    folderId:
      action.folderId === FOLDER_ALL_ID ? FOLDER_NOTES_ID : action.folderId
  };

  return {
    ...state,
    notes: [note, ...state.notes],
    active: [note.id]
  };
};

const getNoteById = (notes, id) => notes.find(note => note.id === id);
const belongsToFolder = folderId => item => item.folderId === folderId;
const notDeleted = item => item.folderId !== FOLDER_DELETED_ID;

const findNextActiveOnRemove = (list, folderId, activeFolderId) => {
  let nextActive;
  //if we are deleting from the folder.current.id === FOLDER_ALL_ID
  if (activeFolderId === FOLDER_ALL_ID) {
    nextActive = list.find(notDeleted);
  } else {
    nextActive = list.find(belongsToFolder(folderId));
  }

  return nextActive ? nextActive.id : null;
};

//TODO: check again the code, that we are deleting notes and folders
const applyDeleteNote = (state, action) => {
  let active = getNoteById(state.notes, state.active[0]);
  let notes;
  let folderId = active.folderId;
  let searched = [];
  let nextActiveId;

  if (folderId === FOLDER_DELETED_ID) {
    notes = state.notes.filter(note => !state.active.includes(note.id));
  } else {
    notes = state.notes.map(note => {
      if (state.active.includes(note.id)) {
        return {
          ...note,
          folderId: FOLDER_DELETED_ID,
          belonged: note.folderId
        };
      } else {
        return note;
      }
    });
  }

  if (action.onSearch) {
    searched = state.searched.filter(note => !state.active.includes(note.id));
    nextActiveId = searched[0] ? searched[0].id : null;
  } else {
    nextActiveId = findNextActiveOnRemove(
      notes,
      folderId,
      action.activeFolderId
    );
  }

  return {
    ...state,
    active: nextActiveId ? [nextActiveId] : null,
    notes,
    searched
  };
};

const applyDeleteFromFolder = (state, action) => {
  const notes = state.notes.map((note, index) => {
    if (note.folderId === action.folderId) {
      return { ...note, folderId: FOLDER_DELETED_ID, belonged: note.folderId };
    } else {
      return note;
    }
  });

  return {
    ...state,
    notes
  };
};

const applyChangeNote = (state, action) => {
  const active = getNoteById(state.notes, state.active[0]);

  //TODO use this somewhere else
  if (action.text === active.text) {
    return state;
  }

  const notes = state.notes.map(note =>
    note.id === active.id
      ? {
          ...note,
          text: action.text,
          title: action.title,
          subtitle: action.subtitle,
          editedAt: action.date
        }
      : note
  );

  return {
    ...state,
    notes
  };
};

const applyFetchErrorNotes = (state, action) => ({
  notes: [],
  error: action.error,
  active: null
});

const findWithRegex = (regex, text, callback) => {
  let matchArr = regex.exec(text);
  let start;

  if (matchArr !== null) {
    start = matchArr.index;
    return {
      start,
      end: start + matchArr[0].length
    };
  } else {
    return null;
  }
};

const applyShowNotesOnSearch = (state, action) => {
  const regex = new RegExp(action.term, 'g');

  let searched = state.notes.filter(note => {
    let blocks = JSON.parse(note.text).blocks;
    let position;

    let foundBlock = blocks.find(block => {
      if ((position = findWithRegex(regex, block.text))) {
        return true;
      }

      return false;
    });

    if (foundBlock) {
      note.search = { position, text: foundBlock.text };
      return true;
    }

    return false;
  });

  return {
    ...state,
    searched
  };
};

const noteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTE_NEW: {
      return applyNewNote(state, action);
    }
    case NOTE_DELETE: {
      return applyDeleteNote(state, action);
    }
    case NOTES_DELETE_FROM_FOLDER: {
      return applyDeleteFromFolder(state, action);
    }
    case NOTES_ADD: {
      return applyAddNotes(state, action);
    }
    case NOTE_SELECT: {
      return applySelectNote(state, action);
    }
    case NOTE_DESELECT: {
      return applyDeSelectNote(state, action);
    }
    case NOTE_CHANGE: {
      return applyChangeNote(state, action);
    }
    case NOTE_REMOVE_ACTIVE: {
      return applyRemoveActiveNote(state, action);
    }
    case NOTES_ON_SEARCH: {
      return applyShowNotesOnSearch(state, action);
    }
    case NOTES_FETCH_ERROR: {
      return applyFetchErrorNotes(state, action);
    }
    default:
      return state;
  }
};

export default noteReducer;
