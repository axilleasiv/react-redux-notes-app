import React from 'react';
import './Editor.css';
import { connect } from 'react-redux';
import { getActiveNote } from '../selectors/note';
import { doChangeNoteText } from '../actions/note';

const Editor = ({ note, onChange }) => (
  <section className="Editor">
    <textarea
      placeholder="Write your note"
      value={note && note.text}
      onChange={({ target }) => onChange(target.value)}
    />
  </section>
);

const mapStateToProps = state => ({
  note: getActiveNote(state)
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(doChangeNoteText(value))
});

/* const mapDispatchToProps = function(dispatch) {
  return {
    onChange: function(value) {
      return dispatch(doChangeNoteText(value));
    }
  }
} */

export default connect(mapStateToProps, mapDispatchToProps)(Editor);