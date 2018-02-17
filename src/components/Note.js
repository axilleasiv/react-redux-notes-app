import React from 'react';
import { connect } from 'react-redux';
import { doSelectNote } from '../actions/note';

const Note = ({note, className, onSelect}) => {
  const {
    title,
  } = note;

  return (
    <div 
      className={'note ' + className}
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
  