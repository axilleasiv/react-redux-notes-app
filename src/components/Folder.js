import React from 'react';
import { connect } from 'react-redux';
import { doSelectFolder } from '../actions/folder';
import style from './Folder.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faFolder as farFolder,
  faFolderOpen as farFolderOpen
} from '@fortawesome/fontawesome-free-regular';

const Folder = ({folder, active, onSelect}) => {  
  return <div onClick={() => onSelect(folder)}>
      <span className={style.icon}>
        {active ? (
          <FontAwesomeIcon icon={farFolderOpen} color="#c3c3c3" />
        ) : (
          <FontAwesomeIcon icon={farFolder} color="#c3c3c3" />
        )}
      </span>
      {folder.name}
    </div>;
}

const mapDispatchToProps = dispatch => ({
  onSelect: folder => dispatch(doSelectFolder(folder))
});

export default connect(
  null,
  mapDispatchToProps
)(Folder);
  