import React from 'react';
import { connect } from 'react-redux';
import { getActiveNote } from '../selectors/note';
import { doChangeNoteText } from '../actions/note';
import style from './Editor.css';

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
}

const Editor = ({ note, onChange }) => (
  <section className={style.editor}>
    <div className={style.date}>{getDate(note.editedAt)}</div>
    <textarea
      className={style.textarea}
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


export default connect(mapStateToProps, mapDispatchToProps)(Editor);