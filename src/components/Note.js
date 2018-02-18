import React from 'react';
import { connect } from 'react-redux';
import { doSelectNote } from '../actions/note';
import style from './Note.css';

const Note = ({note, className, onSelect}) => {
  const {
    title,
  } = note;

  return (
    <div 
      className={style[className]}
      onClick={() => onSelect(note)}
    >
      {title}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  onSelect: note => dispatch(doSelectNote(note)),
});

export default connect(
  null,
  mapDispatchToProps
)(Note);
  