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
import {
  doEnableDocSearch,
  doDisableDocSearch,
  doToggleKey
} from '../actions/tools';
import { doSaveFolder } from '../actions/folder';
import { doNewNote } from '../actions/note';

const keyMap = {
  showSearch: [`command+f`, `ctrl+f`],
  newNote: [`command+n`, `ctrl+n`],
  dismiss: 'escape',
  onEnter: 'enter',
  onShiftDown: { sequence: 'shift', action: 'keydown' },
  onShiftUp: { sequence: 'shift', action: 'keyup' }
};
//stateless?
class App extends Component {
  onBlur(e) {
    var currentTarget = e.currentTarget;

    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        console.log('component officially blurred');
      }
    }, 0);
  }
  render() {
    const { searchDocEnabled, handlers } = this.props;

    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
        {/* <div className={style.app} tabIndex="0" onBlur={this.onBlur}> */}
        <div className={style.app}>
          <TopBar />
          <FolderSideBar />
          <SideBar />
          <MainPanel>
            {searchDocEnabled && <SearchBar />}
            <Editor />
          </MainPanel>
        </div>
      </HotKeys>
    );
  }
}

const mapStateToProps = ({ toolsState }) => ({
  searchDocEnabled: toolsState.searchDoc.enabled
});

const mapDispatchToProps = dispatch => ({
  handlers: {
    showSearch: e => {
      e.preventDefault();
      dispatch(doEnableDocSearch());
    },

    dismiss: e => {
      e.preventDefault();
      dispatch(doDisableDocSearch());
    },

    onEnter: e => {
      if (e.target.id === 'folderNew') {
        dispatch(doSaveFolder(e.target.value));
      }
    },

    newNote: e => {
      e.preventDefault();
      dispatch(doNewNote());
    },
    //TODO on blur or visibility change shift remains true, so reset keys
    onShiftDown: e => {
      dispatch(doToggleKey({ name: 'shift', value: true }));
    },

    onShiftUp: e => {
      dispatch(doToggleKey({ name: 'shift', value: false }));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
