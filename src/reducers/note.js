import { NOTES_ADD, NOTE_SELECT, NOTES_FETCH_ERROR, NOTE_CHANGE_TEXT, NOTE_NEW, NOTE_DELETE } from '../constants/actionTypes';

const INITIAL_STATE = {
  notes: [
    {
      id: 1,
      title: "This is a title",
      text:
        "Το καλοκαίρι στη μετεωρολογία καθορίζεται συμβατικά ως η περίοδος που περιλαμβάνει για το Βόρειο ημισφαίριο τους μήνες Ιούνιο, Ιούλιο και Αύγουστο και διαρκεί από το θερινό ηλιοστάσιο έως τη φθινοπωρινή ισημερία. Στο Νότιο ημισφαίριο το καλοκαίρι ξεκινά κατά τις 21 Δεκεμβρίου, και περιλαμβάνει συμβατικά τους μήνες Δεκέμβριο, Ιανουάριο και Φεβρουάριο. Κατά την διάρκεια του (Ιουνίου, Ιουλίου και Αυγούστου) και (Δεκέμβρη, Ιανουαρίου και Φεβρουαρίου), το Βόρειο και το Νότιο ημισφαίριο ξεπερνούν αντίστοιχα σε άνοδο της θερμοκρασίας τους υπόλοιπους μήνες.",
      createdAt: 1518909135895,
      editedAt: 1518909135895
    },
    {
      id: 2,
      title: "This is a title 2",
      text:
        "Ο Χειμώνας είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης και είναι η ψυχρότερη εποχή του έτους. Αστρονομικά, ξεκινά με το χειμερινό ηλιοστάσιο στις 21 Δεκεμβρίου στο Βόρειο Ημισφαίριο και στις 21 Ιουνίου στο Νότιο Ημισφαίριο. Τελειώνει κατά την εαρινή ισημερία στις 21 Μαρτίου στο Βόρειο ημισφαίριο και στις 23 Σεπτεμβρίου στο Νότιο. Στην μετεωρολογία μετρούνται συμβατικά οι μήνες Δεκέμβριος, Ιανουάριος, Φεβρουάριος για το Βόρειο Ημισφαίριο και Ιούνιος, Ιούλιος και Αύγουστος για το Νότιο.",
      createdAt: 1518909135895,
      editedAt: 1518909135895
    },
    {
      id: 3,
      title: "This is a title 3",
      text:
        "Η Άνοιξη είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης. Αστρονομικά ξεκινά με την εαρινή ισημερία κατά τις 21 Μαρτίου στο Βόρειο ημισφαίριο (η ακριβής ημερομηνία ποικίλει ανάμεσα στις 19 και 21 Μαρτίου), περιλαμβάνει τους μήνες Μάρτιο, Απρίλιο Μάιο και τελειώνει με το θερινό ηλιοστάσιο στις 21 Ιουνίου. Στο Νότιο ημισφαίριο η εαρινή ισημερία ξεκινά στις 21 Σεπτεμβρίου, περιλαμβάνει τους μήνες Σεπτέμβριο, Οκτώβριο και Νοέμβριο και τελειώνει στο χειμερινό ηλιοστάσιο, στις 21 Δεκεμβρίου. Στη μετεωρολογία αναφέρονται συμβατικά οι τρεις μήνες του βόρειου είτε του νότιου ημισφαίριου ως Άνοιξη, παρόλο που η πραγματική διάρκεια της εν λόγω εποχής είναι 21 Μαρτίου - 21 Ιουνίου και 21 Σεπτεμβρίου - 21 Δεκεμβρίου αντίστοιχα. Στο Κελτικό ημερολόγιο η Άνοιξη περιλαμβάνει τους μήνες Φεβρουάριο-Απρίλιο.",
      createdAt: 1518909135895,
      editedAt: 1518909135895
    },
    {
      id: 4,
      title: "This is a title 4",
      text:
        "Tο Φθινόπωρο είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης, η ενδιάμεση ανάμεσα στο καλοκαίρι και τον χειμώνα. Ξεκινά στο Βόρειο ημισφαίριο κατά την φθινοπωρινή ισημερία, στις 21 Σεπτεμβρίου και στις 21 Μαρτίου στο Νότιο ημισφαίριο. Αντίστοιχα στο Βόρειο τελειώνει στο χειμερινό ηλιοστάσιο στις 21 Δεκεμβρίου και στις 21 Ιουνίου στο Νότιο. Ωστόσο, για τη μετεωρολογία οι μήνες Σεπτέμβριος, Οκτώβριος και Νοέμβριος στο βόρειο ημισφαίριο και Μάρτιος, Απρίλιος, Μάιος στο νότιο ημισφαίριο απαρτίζουν συμβατικά την εποχή του Φθινοπώρου. Εξαίρεση σε αυτού του είδους τη διαίρεση αποτελεί το Κελτικό ημερολόγιο που ακολουθεί τον Κελτικό ημερολογιακό κύκλο και θεωρεί ως μήνες του Φθινοπώρου τον Αύγουστο, τον Σεπτέμβριο και τον Οκτώβριο.",
      createdAt: 1518909135895,
      editedAt: 1518909135895
    }
  ],
  error: null,

  //TODO add initial active item and save this on cache on restart to be the same
  active: {
    id: 1,
    title: "This is a title",
    text:
      "Το καλοκαίρι στη μετεωρολογία καθορίζεται συμβατικά ως η περίοδος που περιλαμβάνει για το Βόρειο ημισφαίριο τους μήνες Ιούνιο, Ιούλιο και Αύγουστο και διαρκεί από το θερινό ηλιοστάσιο έως τη φθινοπωρινή ισημερία. Στο Νότιο ημισφαίριο το καλοκαίρι ξεκινά κατά τις 21 Δεκεμβρίου, και περιλαμβάνει συμβατικά τους μήνες Δεκέμβριο, Ιανουάριο και Φεβρουάριο. Κατά την διάρκεια του (Ιουνίου, Ιουλίου και Αυγούστου) και (Δεκέμβρη, Ιανουαρίου και Φεβρουαρίου), το Βόρειο και το Νότιο ημισφαίριο ξεπερνούν αντίστοιχα σε άνοδο της θερμοκρασίας τους υπόλοιπους μήνες.",
    createdAt: 1518909135895,
    editedAt: 1518909135895
  },

  newNote: false
};

const applyAddNotes = (state, action) => ({
  notes: action.notes,
  error: null,
  active: null
});

//store.dispatch
// const applySelectNote = (state, action) => ({
//   notes: state.notes,
//   error: null,
//   active: action.id
// });

const applySelectNote = (state, action) => ({
  ...state, 
  active: action.note
});

const applyNewNote = (state, action) => {
  const date = new Date().getTime();
  const note = {
    id: Math.round(Math.random() * (50000000000 - 5) + 5), //TODO uuid v4
    title: '',
    text: '',
    createdAt: date,
    editedAt: date
  }

  return {
    ...state,
    notes: [note, ...state.notes],    
    active: note,
    newNote: true
  }
}

const applyDeleteNote = (state, action) => {
  const active = state.active;
  let deletedIndex = 0;
  let newNote = false;
  
  const notes = state.notes.filter((note, index) => {
    if (note.id === active.id) {
      deletedIndex = index;
      return false;
    } else {
      return true;
    }
  });

  const newActive = Object.assign({}, notes[deletedIndex]);

  if (notes[0].text === "") {
    newNote = true;
  }

  return  {
    ...state,
    active: newActive,
    notes,
    newNote,
  };
}

const applyChangeText = (state, action) => {
  const active = state.active;
  let newNote = false;
  const timestamp = new Date().getTime();

  const notes = state.notes.map(note =>
    note.id === active.id
      ? { ...note, text: action.text, editedAt: timestamp }
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
      editedAt: timestamp
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
