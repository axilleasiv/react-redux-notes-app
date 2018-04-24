import React from 'react';
import Note from './Note'
import { connect } from 'react-redux';
import { getNotes, getActiveNote } from '../selectors/note';

const getUiState = (note, active) => {
  if (note.id === (active && active.id)) {
    if (active.selected) {
      return 'selected';
    } else {
      return 'active';
    }
  }

  return 'note';
};

const Notes = ({ notes, active }) => (
  <div className="notes">
    {/* {error && <p className="error">Something went wrong ...</p>} */}

    {(notes || []).map(note => (
      <Note key={note.id} note={note} className={getUiState(note, active)} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  notes: getNotes(state),
  active: getActiveNote(state)
});

//TODO dispatch on mount for notes and active note

export default connect(mapStateToProps)(Notes);