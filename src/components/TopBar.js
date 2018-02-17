import React from 'react';
import { connect } from 'react-redux';
import { doNewNote, doDeleteNote } from '../actions/note';
import { getIfNewNote } from '../selectors/note'
import './TopBar.css'


import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";

const Button = ({ children, onClick, disabled }) =>
  <button disabled={disabled} onClick={onClick}>{children}</button>

const TopBar = ({ newNote, onClickNew, onClickDel }) => (
  <header className="Top-header clearfix">
    
    <Button disabled={newNote}  onClick={({ target }) => onClickNew(target.value)}>
      <FontAwesomeIcon icon={faEdit} color="#c3c3c3" />
    </Button>

    <Button onClick={({ target }) => onClickDel(target.value)}>
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