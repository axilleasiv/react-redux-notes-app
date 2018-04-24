import {
  NOTES_ADD,
  NOTE_SELECT,
  NOTE_DESELECT,
  NOTES_FETCH_ERROR,
  NOTE_CHANGE_TEXT,
  NOTE_NEW,
  NOTE_DELETE
} from '../constants/actionTypes';
import {
  FOLDER_ALL_ID,
  FOLDER_NOTES_ID,
  FOLDER_DELETED_ID,
} from '../constants/folders';
//TODO
const INITIAL_STATE = {};

const applyAddNotes = (state, action) => ({
  notes: action.notes,
  error: null,
  active: null
});

const applySelectNote = (state, action) => ({
  ...state,
  active: action.note ? {
    ...action.note,
    selected: action.selected
  } : null
});

const applyDeSelectNote = (state, action) => ({
  ...state,
  active: {
    ...state.active,
    selected: false
  }
});

const applyNewNote = (state, action) => {
  const note = {
    id: action.id,
    title: '',
    text: '',
    createdAt: action.date,
    editedAt: action.date,
    belongs: action.folderId === FOLDER_ALL_ID ? FOLDER_NOTES_ID : action.folderId
  }

  return {
    ...state,
    notes: [note, ...state.notes],    
    active: note,
    newNote: true
  }
}

const isNotDeleted = item => item.belongs !== FOLDER_DELETED_ID;

const findNextActiveOnRemove = (list, id) => {
  const nextActive = list.find(isNotDeleted);

  return Object.assign({}, nextActive);
};

const applyDeleteNote = (state, action) => {
  const active = state.active;
  let newNote = false;
  
  const notes = state.notes.map((note, index) => {
    if (note.id === active.id) {
      return { ...note, belongs: FOLDER_DELETED_ID, belonged: note.belongs };
    } else {
      return note;
    }
  });

  // if (notes[0].text === "") {
  //   newNote = true;
  // }

  return  {
    ...state,
    active: findNextActiveOnRemove(notes, active.id),
    notes,
    newNote,
  };
}

const applyChangeText = (state, action) => {
  const active = state.active;
  let newNote = false;

  const notes = state.notes.map(note =>
    note.id === active.id
      ? { ...note, text: action.text, editedAt: action.date }
      : note
    );

  if (notes[0].text === '') {
    newNote = true;
  }

  return  {
    ...state,
    active: {
      ...active,
      text: action.text,
      editedAt: action.date
    },
    notes,
    newNote,
  };
}

const applyFetchErrorNotes = (state, action) => ({
  notes: [],
  error: action.error,
  active: null
});

function noteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTE_NEW: {
      return applyNewNote(state, action);
    }
    case NOTE_DELETE: {
      return applyDeleteNote(state, action);
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
    case NOTE_CHANGE_TEXT: {
      return applyChangeText(state, action);
    }
    case NOTES_FETCH_ERROR: {
      return applyFetchErrorNotes(state, action);
    }
    default:
      return state;
  }
}

export default noteReducer;
