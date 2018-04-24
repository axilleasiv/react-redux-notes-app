import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import style from './TopBar.css';
import { doNewNote, doDeleteNote } from '../actions/note';
import { checkIfCanAddNewNote, checkIfCanDelete } from '../selectors/note';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const TopBar = ({ cannotAddNote, cannotDelete, onClickNew, onClickDel }) => (
  <header className={style.header}>
    <Button
      className={style.button}
      disabled={cannotAddNote}
      onClick={onClickNew}
    >
      <FontAwesomeIcon icon={faEdit} color="#c3c3c3" />
    </Button>

    <Button
      className={style.button}
      disabled={cannotDelete}
      onClick={onClickDel}
    >
      <FontAwesomeIcon icon={faTrashAlt} color="#c3c3c3" />
    </Button>
  </header>
);

const mapStateToProps = state => ({
  cannotAddNote: !checkIfCanAddNewNote(state),
  cannotDelete: !checkIfCanDelete(state)
});

const mapDispatchToProps = dispatch => ({
  onClickNew: () => dispatch(doNewNote()),
  onClickDel: () => dispatch(doDeleteNote())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);