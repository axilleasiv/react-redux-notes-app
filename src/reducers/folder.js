import {
  FOLDER_SELECT,
  FOLDER_NEW,
  FOLDER_EDIT,
  FOLDER_SAVE,
  FOLDER_DELETE,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  folders: [
    {
      id: 1,
      name: 'All Notes'
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
  active: action.folder,
});

const addNewFolder = (state, action) => {
  const folder = {
    id: Math.round(Math.random() * (50000000000 - 5) + 5), //TODO uuid v4
    name: 'New Folder',
    new: true
  }

  return {
    ...state,
    folders: [...state.folders, folder],
    active: folder,
  }
}

const applyEditFolder = (state, action) => {
  const active = state.active;

  const folders = state.folders.map(folder =>
    folder.id === active.id
      ? { ...folder, name: action.name}
      : folder
    );

  return  {
    ...state,
    folders
  };
};

const applySaveFolder = (state, action) => {
  const active = state.active;
  let folders = [];

  if (action.name === '') {
    folders = state.folders.filter(folder => folder.id !== active.id);

    console.log(folders);
  } else {
    folders = state.folders.map(folder =>
      folder.id === active.id
        ? {id: folder.id, name: folder.name}
        : folder
    );
  }

  return  {
    ...state,
    folders
  };
}

const applyDeleteFolder = (state, action) => {
  
}

function folderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FOLDER_NEW: {
      return addNewFolder(state, action);
    }
    case FOLDER_EDIT: {
      return applyEditFolder(state, action);
    }
    case FOLDER_SAVE: {
      return applySaveFolder(state, action);
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
