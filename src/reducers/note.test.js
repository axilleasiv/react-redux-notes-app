import {
  NOTE_NEW,
  NOTE_SELECT,
  NOTE_CHANGE_TEXT,
  NOTE_DELETE,
} from '../constants/actionTypes';
import note from './note';
import deepFreeze from 'deep-freeze';

describe('note reducer', () => {
  const stateBefore = {
    notes: [
      {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 2,
          title: 'This is one more title',
          text: 'This is the text',
      },
      {
        id: 1,
        title: 'This is a title',
        text: 'This is the text',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        belongs: 2,
      }
    ],
    active: {
        id: 1,
        title: 'This is a title',
        text: 'This is the text',
        createdAt: 1518909135895,
        editedAt: 1518909135895,
        belongs: 2,
    },
    error: null,
    newNote: false
  };

  it('Add new note', () => {
    const stateAfter = {
      notes: [
        {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 3,
          text: '',
          title: '',
        },
        {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 2,
          title: 'This is one more title',
          text: 'This is the text',
        },
        {
          id: 1,
          title: 'This is a title',
          text: 'This is the text',
          createdAt: 1518909135895,
          editedAt: 1518909135895,
          belongs: 2,
        }
      ],
      active: {
        belongs: 2,
        id: 3,
        title: '',
        text: '',
        createdAt: 1524488625496,
        editedAt: 1524488625496,
      },
      error: null,
      newNote: true
    };
    const action = {
      type: NOTE_NEW,
      id: 3,
      date: 1524488625496
    };

    

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(note(stateBefore, action)).toEqual(stateAfter);
  });

  //TODO use only the id for select note
  it('Select note', () => {
    const stateAfter = {
      notes: [
        {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 2,
          title: 'This is one more title',
          text: 'This is the text',
        },
        {
          id: 1,
          title: 'This is a title',
          text: 'This is the text',
          createdAt: 1518909135895,
          editedAt: 1518909135895,
          belongs: 2,
        }
      ],
      active: {
        belongs: 2,
        createdAt: 1524488625496,
        editedAt: 1524488625496,
        id: 2,
        title: 'This is one more title',
        text: 'This is the text',
      },
      error: null,
      newNote: false
    };
    const action = {
      type: NOTE_SELECT,
      note: {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 2,
          title: 'This is one more title',
          text: 'This is the text',
      }
    };

    

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(note(stateBefore, action)).toEqual(stateAfter);
  });

  it('Change text of a note', () => {
    const stateAfter = {
      notes: [
        {
            belongs: 2,
            createdAt: 1524488625496,
            editedAt: 1524488625496,
            id: 2,
            title: 'This is one more title',
            text: 'This is the text',
        },
        {
          id: 1,
          title: 'This is a title',
          text: 'I am editing the text',
          createdAt: 1518909135895,
          editedAt: 1524492310218,
          belongs: 2,
        }
      ],
      active: {
          id: 1,
          title: 'This is a title',
          text: 'I am editing the text',
          createdAt: 1518909135895,
          editedAt: 1524492310218,
          belongs: 2,
      },
      error: null,
      newNote: false
    };
    const action = {
      type: NOTE_CHANGE_TEXT,
      text: 'I am editing the text',
      date: 1524492310218
    };

    

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(note(stateBefore, action)).toEqual(stateAfter);
  });

  it('delete a note', () => {
    const stateAfter = {
      notes: [
        {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 2,
          title: 'This is one more title',
          text: 'This is the text',
        },
        {
          id: 1,
          title: 'This is a title',
          text: 'This is the text',
          createdAt: 1518909135895,
          editedAt: 1518909135895,
          belongs: 3,
          belonged: 2,
        }
      ],
      active: {
          belongs: 2,
          createdAt: 1524488625496,
          editedAt: 1524488625496,
          id: 2,
          title: 'This is one more title',
          text: 'This is the text',
      },
      error: null,
      newNote: false
    };
    const action = {
      type: NOTE_DELETE,
    };

    

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(note(stateBefore, action)).toEqual(stateAfter);
  });


});
