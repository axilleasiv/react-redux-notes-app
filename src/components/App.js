import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import './App.css';
import TopBar from './TopBar';
import SideBar from './SideBar';
import FolderSideBar from './FolderSideBar';
import MainPanel from './MainPanel';
import SearchBar from './SearchBar';
import Editor from './Editor';
import style from './App.css';
import { doEnableDocSearch, doDisableDocSearch } from '../actions/tools';
import { doSaveFolder } from '../actions/folder';

const keyMap = {
  showSearch: [`command+f`, `ctrl+f`],
  dismiss: 'escape',
  onEnter: 'enter'
};
//stateless?
class App extends Component {
  render() {
    const {
      searchDocEnabled,
      handlers
    } = this.props;

    return <HotKeys keyMap={keyMap} handlers={handlers}>
        <div className={style.app}>
          <TopBar />
          <FolderSideBar />
          <SideBar />
          <MainPanel>
          {searchDocEnabled && <SearchBar />}
            <Editor />
          </MainPanel>
        </div>
      </HotKeys>;
  }
}

const mapStateToProps = ({ toolsState }) => ({
  searchDocEnabled: toolsState.searchDoc.enabled
});

const mapDispatchToProps = dispatch => ({
  handlers: {
    showSearch: (e) => {
      e.preventDefault();
      dispatch(doEnableDocSearch())
    },

    dismiss: (e) => {
      e.preventDefault()
      dispatch(doDisableDocSearch());
    },

    onEnter: (e) => {
      console.log(e.target);
      if (e.target.id === 'folderNew') {
        dispatch(doSaveFolder(e.target.value));
      }
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
