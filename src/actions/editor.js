import { EDITOR_UPDATE, EDITOR_LOAD } from '../constants/actionTypes';
import { convertToRaw } from 'draft-js';
import { doChangeNote } from './note';

const notBlankLine = item => item.text !== '';
const doUpdateEditor = content => (dispatch, getState) => {
  if (!getState().editorState.loaded) {
    return;
  }

  dispatch({
    type: EDITOR_UPDATE,
    content
  });

  const raw = convertToRaw(content.getCurrentContent());
  const text = JSON.stringify(raw);
  const notBlankLines = raw.blocks.filter(notBlankLine);
  const title = notBlankLines[0] ? notBlankLines[0].text : '';
  const subtitle = notBlankLines[1] ? notBlankLines[1].text : '';

  dispatch(doChangeNote(text, title, subtitle));
};

const doLoadEditor = (editorState, note) => ({
  type: EDITOR_LOAD,
  editorState,
  note
});

export { doUpdateEditor, doLoadEditor };
