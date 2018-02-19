import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSelectFolder, doSaveFolder, doEditFolder } from '../actions/folder';
import style from './Folder.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faFolder as farFolder,
  faFolderOpen as farFolderOpen
} from '@fortawesome/fontawesome-free-regular';

class Folder extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const {
      folder,
      active,
      onChange,
      onSelect,
      onBlur,
    } = this.props;

    return (
      <div className={active ? style.active : style.folder} onClick={() => onSelect(folder)}>
      <span className={style.icon}>
        {active ? (
          <FontAwesomeIcon icon={farFolderOpen} color="#c3c3c3" />
        ) : (
          <FontAwesomeIcon icon={farFolder} color="#c3c3c3" />
        )}
      </span>
      {folder.new ?
        <input 
          type="text" 
          value={folder.name} 
          onChange={({target}) => onChange(target.value) }
          onBlur={() => onBlur()}
          ref={node => {this.input = node;}}
        />
         : 
         folder.name}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSelect: folder => dispatch(doSelectFolder(folder)),
  onChange: (id, name) => dispatch(doEditFolder(id, name)),
  onBlur: () => dispatch(doSaveFolder())
});

export default connect(
  null,
  mapDispatchToProps
)(Folder);
  