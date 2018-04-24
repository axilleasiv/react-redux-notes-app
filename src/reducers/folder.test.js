import { FOLDER_NEW, FOLDER_SELECT, FOLDER_SAVE } from '../constants/actionTypes';
import folder from './folder';
import deepFreeze from 'deep-freeze';

describe('folder reducer', () => {
  const stateBefore = {
    folders: [
      {id: 1,name: 'All'},
      {id: 2,name: 'Notes'},
      {id: 3,name: 'Recently Deleted'},
      {id: 4,name: 'My folder'},
    ],

    active: {id: 2,name: 'All'}
  };

  it('select folder', () => {
    const stateAfter = {
      folders: [
        {id: 1, name: 'All'},
        {id: 2, name: 'Notes'},
        {id: 3,name: 'Recently Deleted'},
        {id: 4,name: 'My folder'},
      ],
      active: {id: 3,name: 'Recently Deleted',selected: true}
    };
    const action = {
      type: FOLDER_SELECT,
      folder: {
        id: 3,
        name: 'Recently Deleted'
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(folder(stateBefore, action)).toEqual(stateAfter);
  });

  it('Add new folder', () => {
    const stateAfter = {
      folders: [
        {id: 1, name: 'All'},
        {id: 2, name: 'Notes'},
        {id: 3, name: 'Recently Deleted'},
        {id: 4,name: 'My folder'},
        {id: 19, name: 'New Folder', new: true}
      ],
      active: {id: 19,name: 'New Folder',new: true}
    };
    const action = {
      type: FOLDER_NEW,
      id: 19
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(folder(stateBefore, action)).toEqual(stateAfter);
  });

  it('save folder', () => {
    const stateBeforeSave = {
      folders: [
        {id: 1,name: 'All'},
        {id: 2,name: 'Notes'},
        {id: 3,name: 'Recently Deleted'},
        {id: 4,name: 'My folder'},
        {id: 19, name: 'New Folder', new: true}
      ],

      active: {id: 19, name: 'New Folder', new: true}
    };
    const stateAfter = {
      folders: [
        {id: 1, name: 'All'},
        {id: 2, name: 'Notes'},
        {id: 3, name: 'Recently Deleted'},
        {id: 4,name: 'My folder'},
        {id: 19, name: 'One more folder'}
      ],
      active: {id: 19, name: 'One more folder'}
    };
    const action = {
      type: FOLDER_SAVE,
      name: 'One more folder'
    };

    deepFreeze(stateBeforeSave);
    deepFreeze(action);

    expect(folder(stateBeforeSave, action)).toEqual(stateAfter);
  });

  it('trying to save folder without no name', () => {
    const stateBeforeSave = {
      folders: [
        {id: 1,name: 'All'},
        {id: 2,name: 'Notes'},
        {id: 3,name: 'Recently Deleted'},
        {id: 4,name: 'My folder'},
        {id: 19, name: 'New Folder', new: true}
      ],

      active: {id: 19, name: 'New Folder', new: true}
    };
    const stateAfter = {
      folders: [
        {id: 1, name: 'All'},
        {id: 2, name: 'Notes'},
        {id: 3, name: 'Recently Deleted'},
        {id: 4,name: 'My folder'},
      ],
      active: {id: 4,name: 'My folder'},
    };
    const action = {
      type: FOLDER_SAVE,
      name: ''
    };

    deepFreeze(stateBeforeSave);
    deepFreeze(action);

    expect(folder(stateBeforeSave, action)).toEqual(stateAfter);
  });
});
