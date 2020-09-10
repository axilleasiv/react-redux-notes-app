const dummyState = {
  archiveState: ['one archive', 'two archive'],
  folderState: {
    folders: [
      {
        id: 1,
        name: 'All' //syncing
      },
      {
        id: 2,
        name: 'Notes'
      },
      {
        id: 3,
        name: 'Recently Deleted'
      },
      {
        id: 4,
        name: 'My folder'
      },
      {
        id: 5,
        name: 'Travelling'
      }
    ],

    active: {
      id: 2,
      name: 'All'
    }
  },
  noteState: {
    searched: [],
    notes: [
      {
        id: 1,
        text:
          '{"blocks":[{"key":"93gum","text":"Το καλοκαίρι στη μετεωρολογία καθορίζεται συμβατικά ως η περίοδος που περιλαμβάνει για το Βόρειο ημισφαίριο τους μήνες Ιούνιο, Ιούλιο και Αύγουστο και διαρκεί από το θερινό ηλιοστάσιο έως τη φθινοπωρινή ισημερία. Στο Νότιο ημισφαίριο το καλοκαίρι ξεκινά κατά τις 21 Δεκεμβρίου, και περιλαμβάνει συμβατικά τους μήνες Δεκέμβριο, Ιανουάριο και Φεβρουάριο. Κατά την διάρκεια του (Ιουνίου, Ιουλίου και Αυγούστου) και (Δεκέμβρη, Ιανουαρίου και Φεβρουαρίου), το Βόρειο και το Νότιο ημισφαίριο ξεπερνούν αντίστοιχα σε άνοδο της θερμοκρασίας τους υπόλοιπους μήνdddες.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Το καλοκαίρι στη μετεωρολογία',
        subtitle: '',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        folderId: 2
      },
      {
        id: 2,
        text:
          '{"blocks":[{"key":"93gum","text":"Ο Χειμώνας είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης και είναι η ψυχρότερη εποχή του έτους. Αστρονομικά, ξεκινά με το χειμερινό ηλιοστάσιο στις 21 Δεκεμβρίου στο Βόρειο Ημισφαίριο και στις 21 Ιουνίου στο Νότιο Ημισφαίριο. Τελειώνει κατά την εαρινή ισημερία στις 21 Μαρτίου στο Βόρειο ημισφαίριο και στις 23 Σεπτεμβρίου στο Νότιο. Στην μετεωρολογία μετρούνται συμβατικά οι μήνες Δεκέμβριος, Ιανουάριος, Φεβρουάριος για το Βόρειο Ημισφαίριο και Ιούνιος, Ιούλιος και Αύγουστος για το Νότιο","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aqe81","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b5jjo","text":"Κυριτσακας Αχιλλέας Δηλαδή","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Ο Χειμώνας είναι μία από τις τέσσερις εποχές',
        subtitle: 'This is a subtitle',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        folderId: 2
      },
      {
        id: 3,
        text:
          '{"blocks":[{"key":"93gum","text":"Η Άνοιξη είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης. Αστρονομικά ξεκινά με την εαρινή ισημερία κατά τις 21 Μαρτίου στο Βόρειο ημισφαίριο (η ακριβής ημερομηνία ποικίλει ανάμεσα στις 19 και 21 Μαρτίου), περιλαμβάνει τους μήνες Μάρτιο, Απρίλιο Μάιο και τελειώνει με το θερινό ηλιοστάσιο στις 21 Ιουνίου. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dg0do","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9b3k9","text":"Στο Νότιο ημισφαίριο η εαρινή ισημερία ξεκινά στις 21 Σεπτεμβρίου, περιλαμβάνει τους μήνες Σεπτέμβριο, Οκτώβριο και Νοέμβριο και τελειώνει στο χειμερινό ηλιοστάσιο, στις 21 Δεκεμβρίου. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"csoo9","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7ssb9","text":"Στη μετεωρολογία αναφέρονται συμβατικά οι τρεις μήνες του βόρειου είτε του νότιου ημισφαίριου ως Άνοιξη, παρόλο που η πραγματική διάρκεια της εν λόγω εποχής είναι 21 Μαρτίου - 21 Ιουνίου και 21 Σεπτεμβρίου - 21 Δεκεμβρίου αντίστοιχα. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2javh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6s43d","text":"Στο Κελτικό ημερολόγιο η Άνοιξη περιλαμβάνει τους μήνες Φεβρουάριο-Απρίλιο.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Η Άνοιξη είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης.',
        subtitle: 'This is a subtitle',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        folderId: 2
      },
      {
        id: 4,
        text:
          '{"blocks":[{"key":"93gum","text":"Tο Φθινόπωρο είναι μία από τις τέσσερις εποχές της εύκρατης ζώνης, η ενδιάμεση ανάμεσα στο καλοκαίρι και τον χειμώνα. Ξεκινά στο Βόρειο ημισφαίριο κατά την φθινοπωρινή ισημερία, στις 21 Σεπτεμβρίου και στις 21 Μαρτίου στο Νότιο ημισφαίριο. Αντίστοιχα στο Βόρειο τελειώνει στο χειμερινό ηλιοστάσιο στις 21 Δεκεμβρίου και στις 21 Ιουνίου στο Νότιο. Ωστόσο, για τη μετεωρολογία οι μήνες Σεπτέμβριος, Οκτώβριος και Νοέμβριος στο βόρειο ημισφαίριο και Μάρτιος, Απρίλιος, Μάιος στο νότιο ημισφαίριο απαρτίζουν συμβατικά την εποχή του Φθινοπώρου. Εξαίρεση σε αυτού του είδους τη διαίρεση αποτελεί το Κελτικό ημερολόγιο που ακολουθεί τον Κελτικό ημερολογιακό κύκλο και θεωρεί ως μήνες του Φθινοπώρου τον Αύγουστο, τον Σεπτέμβριο και τον Οκτώβριο.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Tο Φθινόπωρο είναι μία από τις τέσσερις εποχές',
        subtitle: 'This is a subtitle',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        folderId: 4
      },
      {
        id: 5,
        text:
          '{"blocks":[{"key":"93gum","text":"Η σύγχρονη Tanjah (εξελλ. Ταγγέρη) είναι αρχαία φοινικική πόλη, η οποία ιδρύθηκε στις αρχές του 5ου αιώνα π.Χ. από Καρχηδόνιους αποίκους. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bjmv4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e340o","text":"Το όνομά της προέρχεται από τη θεά του βερβερικού πανθέου Τίγγιδα Αχιλλέας","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Η σύγχρονη Tanjah (εξελλ. Ταγγέρη) είναι αρχαία',
        subtitle: 'This is a subtitle',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        folderId: 5
      },
      {
        id: 6,
        text:
          '{"blocks":[{"key":"93gum","text":"Από τις πρώτες γραπτές ιστορικές πηγές, η Τυνησία κατοικείτο από φυλές Βερβέρων, οι οποίοι είναι απόγονοι αγροτικών κοινοτήτων στις παράκτιες πεδιάδες της κεντρικής Τυνησίας. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":175,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9t43g","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bejaq","text":"Στα αρχαία χρόνια πίστευαν ότι η Αφρική ήταν αρχικά κατοικημένη από τους Γέτουλες (ρωμαϊκή ονομασία αρχαίας βερβερικής φυλής που κατοικούσε στην περιοχή Γετούλια) και Λίβυους, και οι δύο νομαδικοί λαοί.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":4,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Από τις πρώτες γραπτές ιστορικές πηγές, η Τυνησία',
        subtitle: 'This is a subtitle',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        folderId: 5
      }
    ],
    error: null,

    active: [1]
    // TODO use multiactive on delete etc and maybe use only ids?
    // active: {
    //   id: 1,
    //   text:
    //     '{"blocks":[{"key":"93gum","text":"Το καλοκαίρι στη μετεωρολογία καθορίζεται συμβατικά ως η περίοδος που περιλαμβάνει για το Βόρειο ημισφαίριο τους μήνες Ιούνιο, Ιούλιο και Αύγουστο και διαρκεί από το θερινό ηλιοστάσιο έως τη φθινοπωρινή ισημερία. Στο Νότιο ημισφαίριο το καλοκαίρι ξεκινά κατά τις 21 Δεκεμβρίου, και περιλαμβάνει συμβατικά τους μήνες Δεκέμβριο, Ιανουάριο και Φεβρουάριο. Κατά την διάρκεια του (Ιουνίου, Ιουλίου και Αυγούστου) και (Δεκέμβρη, Ιανουαρίου και Φεβρουαρίου), το Βόρειο και το Νότιο ημισφαίριο ξεπερνούν αντίστοιχα σε άνοδο της θερμοκρασίας τους υπόλοιπους μήνdddες.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    //   title: 'Το καλοκαίρι στη μετεωρολογία',
    //   subtitle: '',
    //   createdAt: 1518909135895,
    //   editedAt: 1518909135895,
    //   folderId: 2
    // },
  }
};

export default dummyState;