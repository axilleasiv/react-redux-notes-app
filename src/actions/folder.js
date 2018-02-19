import {
  FOLDER_SELECT,
  FOLDER_DELETE,
  FOLDER_NEW,
} from "../constants/actionTypes";


const doNewFolder = folder => ({
  type: FOLDER_NEW
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
  doDeleteFolder,
  doSelectFolder,
};