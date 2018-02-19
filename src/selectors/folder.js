const getFolders = ({ folderState }) => {
  return folderState.folders;
};

const getActiveFolder = ({ folderState }) => folderState.active;

export { getFolders, getActiveFolder };
