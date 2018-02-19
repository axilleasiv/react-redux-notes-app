import React from 'react';
import Folders from './Folders';
import style from './FolderSideBar.css';

const SideBar = () => (
  <aside className={`${style.sidebar} no-select`}>
    <Folders />
  </aside>
);

export default SideBar;
