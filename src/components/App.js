import React, { Component } from 'react';
import './App.css';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Editor from './Editor';
import style from './App.css';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <TopBar />
        <SideBar />
        <Editor />
      </div>
    );
  }
}

export default App;
