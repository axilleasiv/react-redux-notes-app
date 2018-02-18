import React from 'react';
import { connect } from 'react-redux';
import { doSelectNote } from '../actions/note';
import style from './Note.css';

const getDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()}`;
};

const notBlankLine = line => line !== '';

const getTitle = text => {
  const MSG = 'New Note';

  if (text === '') {
    return MSG;
  }

  let title = text.split('\n').find(notBlankLine);
  
  return title ? title.substr(0, 30) : MSG;
};

const getSubTitle = text => {
  const MSG = 'No Additional text';

  if (text === '') {
    return MSG;
  } 
  
  let arr = text.split('\n');
  let sub = '';
  const titleindex = arr.findIndex(notBlankLine);

  arr.splice(titleindex, 1);
  sub = arr.find(notBlankLine);

  return sub ? sub.substr(0, 25) : MSG;
};

const Note = ({note, className, onSelect}) => {
  const {
    createdAt,
    text,
  } = note;

  return (
    <div 
      className={style[className]}
      onClick={() => onSelect(note)}
    >
      <p className={style.title}>{getTitle(text)}</p>
      <p className={style.subtitle}>
        <span className={style.date}>{getDate(createdAt)}</span>
        {getSubTitle(text)}
      </p>
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
  