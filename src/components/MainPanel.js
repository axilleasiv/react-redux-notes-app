import React from 'react';
import style from './MainPanel.css';

const MainPanel = props => (
  <div className={style['main-panel']}>{props.children}</div>
);

export default MainPanel;
