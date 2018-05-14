import React from 'react';
import Note from './Note'
import { connect } from 'react-redux';
import { getNotes } from '../selectors/note';

const getUiState = (note, active) => {
  if (active) {
    if (note.selected) {
      return 'selected';
    } else if(active.includes(note.id)) {
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
  active: state.noteState.active
});

//TODO dispatch on mount for notes and active note

export default connect(mapStateToProps)(Notes);