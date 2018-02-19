import { FOLDER_SELECT, FOLDER_NEW, FOLDER_DELETE } from '../constants/actionTypes';

const INITIAL_STATE = {
  folders: [
    {
      id: 1,
      name: 'main'
    },
    {
      id: 2,
      name: 'Recently Deleted'
    }
  ],

  active: {
    id: 1,
    name: 'main'
  },

};


const applySelectFolder = (state, action) => ({
  ...state, 
  active: action.folder
});

const applyNewFolder = (state, action) => {
  
}

const applyDeleteFolder = (state, action) => {
  
}

function folderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FOLDER_NEW: {
      return applyNewFolder(state, action);
    }
    case FOLDER_DELETE: {
      return applyDeleteFolder(state, action);
    }
    case FOLDER_SELECT: {
      return applySelectFolder(state, action);
    }
    default:
      return state;
  }
}

export default folderReducer;
