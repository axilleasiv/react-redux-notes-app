import {
  FOLDER_SELECT,
  FOLDER_DELETE,
  FOLDER_NEW,
  FOLDER_SAVE,
  FOLDER_EDIT,
} from '../constants/actionTypes';
import uuidv4 from 'uuid/v4';

const doNewFolder = folder => ({
  type: FOLDER_NEW,
  id: uuidv4()
});

const doEditFolder = name => ({
  type: FOLDER_EDIT,
  name: name
});

const doSaveFolder = (name) => ({
  type: FOLDER_SAVE,
  name: name
});

const doDeleteFolder = folder => ({
  type: FOLDER_DELETE
});

const doSelectFolder = folder => ({
  type: FOLDER_SELECT,
  folder
});

export {
  doNewFolder,
  doEditFolder,
  doSaveFolder,
  doDeleteFolder,
  doSelectFolder,
};