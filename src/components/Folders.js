import React from 'react';
import Folder from './Folder'
import { connect } from 'react-redux';
import { getFolders, getActiveFolder } from '../selectors/folder';
import { doNewFolder } from '../actions/folder';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import style from './Folders.css';

const Folders = ({ folders, active, onClick }) => (
  <div>
    <div className={style.folders}>
      {(folders || []).map(folder => (
        <Folder
          key={folder.id}
          folder={folder}
          active={folder.id === (active && active.id)}
        />
      ))}
    </div>
    <div className={style.new} onClick={onClick}>
      <span className={style.icon}>
        <FontAwesomeIcon icon={faPlusCircle} color="#c3c3c3" />
      </span>
      New Folder
    </div>
  </div>
);

const mapStateToProps = state => ({
  folders: getFolders(state),
  active: getActiveFolder(state)
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(doNewFolder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Folders);