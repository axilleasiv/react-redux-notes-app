import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import './App.css';
import TopBar from './TopBar';
import SideBar from './SideBar';
import FolderSideBar from './FolderSideBar';
import Editor from './Editor';
import style from './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.triggerSearch = this.triggerSearch.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  dismiss(e) { e.preventDefault()}

  triggerSearch(e) { e.preventDefault() }

  onEnter(e) {}

  render() {
    const keyMap = {
      openSearch: [`command+f`, `ctrl+f`],
      dismiss: 'escape',
      onEnter: 'enter'
    };

    const handlers = {
      openSearch: this.triggerSearch,
      dismiss: this.dismiss,
      onEnter: this.onEnter
    };

    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className={style.app}>
        <TopBar />
        <FolderSideBar />
        <SideBar />
        <Editor />
      </div>
      </HotKeys>
    );
  }
}

export default App;
