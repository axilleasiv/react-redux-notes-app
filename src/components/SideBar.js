import React from 'react';
import Notes from './Notes';
import style from './SideBar.css';

const SideBar = () => (
  <aside className={`${style.sidebar} no-select`}>
    <Notes />
  </aside>
);

export default SideBar;
