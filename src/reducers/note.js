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
  NOTES_ON_SEARCH,
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

const isNotNewNote = note => note.title !== '';
const applySelectNote = (state, action) => ({
  ...state,
  notes: state.notes.filter(isNotNewNote),
  active: action.note ? {
    ...action.note,
    selected: action.selected
  } : null
});

const applyRemoveActiveNote = (state, action) => ({
  ...state,
  notes: state.notes.filter(isNotNewNote),
  active: null
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
    subtitle: '',
    text: '',
    createdAt: action.date,
    editedAt: action.date,
    folderId: action.folderId === FOLDER_ALL_ID ? FOLDER_NOTES_ID : action.folderId
  }

  return {
    ...state,
    notes: [note, ...state.notes],    
    active: note
  }
}

const isNotDeleted = item => item.folderId !== FOLDER_DELETED_ID;
const belongsToFolder = folderId => item => item.folderId === folderId;

const findNextActiveOnRemove = (list, active) => {
  const nextActive = list.filter(isNotDeleted)
                          .find(belongsToFolder(active.folderId))

  return Object.assign({}, nextActive);
};

const applyDeleteNote = (state, action) => {
  const active = state.active;
  let notes;

  if (state.newNote) {
    notes = state.notes.filter(note => note.id !== active.id);
  } else {
    notes = state.notes.map((note, index) => {
      if (note.id === active.id) {
        return { ...note, folderId: FOLDER_DELETED_ID, belonged: note.folderId };
      } else {
        return note;
      }
    });
  }

  return  {
    ...state,
    active: findNextActiveOnRemove(notes, active),
    notes,
  };
}

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
  const active = state.active;

  //TODO use this somewhere else
  if (action.text === active.text) {
    return state;
  }

  const notes = state.notes.map(note =>
    note.id === active.id
      ? { ...note, text: action.text, title: action.title, subtitle: action.subtitle, editedAt: action.date }
      : note
    );

  return  {
    ...state,
    active: {
      ...active,
      text: action.text,
      title: action.title,
      subtitle: action.subtitle,
      editedAt: action.date
    },
    notes
  };
}

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
    }
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
  }

}

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
}

export default noteReducer;
