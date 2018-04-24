import {
  NOTES_ADD,
  NOTE_SELECT,
  NOTES_FETCH_ERROR,
  NOTE_CHANGE_TEXT,
  NOTE_NEW,
  NOTE_DELETE
} from '../constants/actionTypes';

//TODO
const INITIAL_STATE = {};

const applyAddNotes = (state, action) => ({
  notes: action.notes,
  error: null,
  active: null
});

const applySelectNote = (state, action) => ({
  ...state, 
  active: action.note
});

const applyNewNote = (state, action) => {
  const note = {
    id: action.id,
    title: '',
    text: '',
    createdAt: action.date,
    editedAt: action.date,
    belongs: 2 //TODO add the current folder to belongs
  }

  return {
    ...state,
    notes: [note, ...state.notes],    
    active: note,
    newNote: true
  }
}

const isNotDeleted = item => item.belongs !== 3;

const findNextActiveOnRemove = (list, id) => {
  const nextActive = list.find(isNotDeleted);

  return Object.assign({}, nextActive);
};

const applyDeleteNote = (state, action) => {
  const active = state.active;
  let newNote = false;
  
  const notes = state.notes.map((note, index) => {
    if (note.id === active.id) {
      return { ...note, belongs: 3,  belonged: note.belongs}
    } else {
      return note;
    }
  });

  if (notes[0].text === "") {
    newNote = true;
  }

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
