import React from 'react';
import Note from './Note'
import { connect } from 'react-redux';
import { getReadableNotes, getActiveNote } from '../selectors/note';

const Notes = ({ notes, active }) => (
  <div className="notes">
    {/* {error && <p className="error">Something went wrong ...</p>} */}

    {(notes || []).map(note => (
      <Note key={note.id} note={note} className={note.id === (active && active.id) ? 'active' : 'note'} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  notes: getReadableNotes(state),
  active: getActiveNote(state)
});

export default connect(mapStateToProps)(Notes);