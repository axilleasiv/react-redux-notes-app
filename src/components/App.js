import React, { Component } from 'react';
import './App.css';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <SideBar />
        <Editor />
      </div>
    );
  }
}

export default App;
