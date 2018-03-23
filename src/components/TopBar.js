import React from 'react';
import { connect } from 'react-redux';
import { doNewNote, doDeleteNote } from '../actions/note';
import { getIfNewNote } from '../selectors/note'
import style from './TopBar.css'
import Button from './Button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const Button = ({ children, onClick, className = 'button', type = 'button', disabled }) =>
  <button type={type} className={className} disabled={disabled} onClick={onClick}>{children}</button>

const TopBar = ({ newNote, onClickNew, onClickDel }) => (
  <header className={style.header}>
    
    <Button className={style.button} disabled={newNote}  onClick={({ target }) => onClickNew(target.value)}>
      <FontAwesomeIcon icon={faEdit} color="#c3c3c3" />
    </Button>

    <Button className={style.button} onClick={({ target }) => onClickDel(target.value)}>
      <FontAwesomeIcon icon={faTrashAlt} color="#c3c3c3" />
    </Button>
  </header>
);

const mapStateToProps = state => ({
  newNote: getIfNewNote(state)
});

const mapDispatchToProps = dispatch => ({
  onClickNew: value => dispatch(doNewNote(value)),
  onClickDel: value => dispatch(doDeleteNote(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);