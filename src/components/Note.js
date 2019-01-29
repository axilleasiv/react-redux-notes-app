import React from 'react';
import { connect } from 'react-redux';
import { doSelectNote } from '../actions/note';
import style from './Note.css';

const getDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()}`;
};

const getTitle = text => {
  const MSG = 'New Note';

  if (text === '') {
    return MSG;
  }

  return text.substr(0, 30);
};

const getSubTitle = text => {
  const MSG = 'No Additional text';

  if (text === '') {
    return MSG;
  }

  return text.substr(0, 25);
};

const formatSearch = search => {
  return search.text.substr(0, 25);
};

const Note = ({ note, className, onSelect }) => {
  const { createdAt, title, subtitle, search } = note;

  return (
    <div className={style[className]} onClick={() => onSelect(note)}>
      <p className={style.title}>{getTitle(title)}</p>
      <p className={style.subtitle}>
        <span className={style.date}>{getDate(createdAt)}</span>
        {search ? formatSearch(search) : getSubTitle(subtitle)}
      </p>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onSelect: note => dispatch(doSelectNote(note))
});

export default connect(
  null,
  mapDispatchToProps
)(Note);
