import {
  FOLDER_SELECT,
  FOLDER_DESELECT,
  FOLDER_NEW,
  FOLDER_EDIT,
  FOLDER_SAVE,
  FOLDER_DELETE
} from '../constants/actionTypes';

//TODO
const INITIAL_STATE = {};

const applySelectFolder = (state, action) => ({
  ...state, 
  active: {
    ...action.folder,
    selected: true
  },
});

const applyDeSelectFolder = (state, action) => ({
  ...state,
  active: {
    ...state.active,
    selected: false
  }
});

const addNewFolder = (state, action) => {
  const folder = {
    id: action.id,
    name: 'New Folder',
    new: true
  }

  return {
    ...state,
    folders: [...state.folders, folder],
    active: {
      ...folder,
      selected: true
    },
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

const findNextActiveOnRemove = (list, index) => {
  //TODO
  return {
    ...list[list.length - 1],
    selected: true
  };
}

const applySaveFolder = (state, action) => {
  const prevActive = state.active;
  let folders = [];
  let active;

  if (action.name === '') {
    let removedIndex;

    folders = state.folders.filter((folder, index) => {
      if (folder.id !== prevActive.id) {
        return true;
      }
      removedIndex = index;
      
      return false;
    });

    active = findNextActiveOnRemove(folders, removedIndex);
  } else {
    folders = state.folders.map(folder =>
      folder.id === prevActive.id
        ? {id: folder.id, name: action.name}
        : folder
    );

    active = {
      id: prevActive.id,
      name: action.name,
      selected: true
    }
  }

  return  {
    ...state,
    folders,
    active
  };
}

const applyDeleteFolder = (state, action) => {
  const active = state.active;
  const folders = state.folders.filter(folder => folder.id !== active.id);

  return {
    ...state,
    folders,
    active: findNextActiveOnRemove(folders),
  };
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
    case FOLDER_DESELECT: {
      return applyDeSelectFolder(state, action);
    }
    default:
      return state;
  }
}

export default folderReducer;
