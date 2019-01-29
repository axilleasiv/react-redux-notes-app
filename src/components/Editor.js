import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateWidget from './DateWidget';
import { getActiveNote } from '../selectors/note';
import style from './Editor.css';
import MyEditor from './MyEditor';

class Editor extends Component {
  render() {
    const { note } = this.props;

    return (
      <section className={style.editor}>
        {note && note.hasOwnProperty('text') && (
          <DateWidget
            default={note.editedAt}
            createdAt={note.createdAt}
            editedAt={note.editedAt}
          />
        )}
        {note && note.hasOwnProperty('text') && <MyEditor note={note} />}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  note: getActiveNote(state)
});

export default connect(mapStateToProps)(Editor);
