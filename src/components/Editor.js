import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveNote } from '../selectors/note';
import { doChangeNoteText, doDeselect } from '../actions/note';
import DateWidget from './DateWidget';
import style from './Editor.css';

class Editor extends Component {
  // componentDidUpdate() {
  //   if (this.textarea) {
  //     this.textarea.focus();
  //   }
  // }

  render() {
    const { note, onChange, onFocus } = this.props;

    return (
      <section className={style.editor}>
        {(note && note.text) && (
          <DateWidget
            default={note.editedAt}
            createdAt={note.createdAt}
            editedAt={note.editedAt}
          />
        )}
        {(note && note.text) && (
          <textarea
            className={style.textarea}
            placeholder="Write your note"
            value={note && note.text}
            onChange={({ target }) => onChange(target.value)}
            onFocus={onFocus}
            ref={node => {
              this.textarea = node;
            }}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  note: getActiveNote(state)
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(doChangeNoteText(value)),
  onFocus: () => dispatch(doDeselect())
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);