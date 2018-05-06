import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
// import { convertToHTML } from 'draft-convert';
import { doChangeNote, doDeselect } from '../actions/note';
import 'draft-js/dist/Draft.css';

class MyEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty(), note: null };

    this.onChange = this.onChange.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState, note: this.props.note });
  }

  componentDidMount() {
    this._setRawContent(this.props.note.text);

    // if (this.refs.editor) {
    //   this.refs.editor.focus();
    // }
  }

  //TODO check this again
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.note.id !== nextProps.note.id) {
      if (nextProps.note.text !== '') {
        this._setRawContent(nextProps.note.text);
      }
    }
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _setRawContent(rawContent) {
    try {
      const parsedJson = JSON.parse(rawContent);
      this._setContentBlock(convertFromRaw(parsedJson));
    } catch (err) {
      console.error('The json is invalid');
    }
  }

  _setContentBlock(content) {
    this.onChange(EditorState.createWithContent(content));
  }

  render() {
    const { onChange, onFocus } = this.props;

    return (
      <Editor
        placeholder="Write your note.."
        spellCheck={true}
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={this.mapKeyToEditorCommand}
        ref="editor"
        onChange={onChange.bind(this)}
        onFocus={onFocus}
      />
    );
  }
}

const notBlankLine = item => item.text !== '';


const mapDispatchToProps = dispatch => ({
  onChange: function(editorState) {
    //TODO
    if (!this.state.note) {
      return;
    }

    this.onChange(editorState);
    
    const raw = convertToRaw(editorState.getCurrentContent());
    const text = JSON.stringify(raw);
    const notBlankLines = raw.blocks.filter(notBlankLine);
    const title = notBlankLines[0] ? notBlankLines[0].text : '';
    const subtitle = notBlankLines[1] ? notBlankLines[1].text : '';

    dispatch(doChangeNote(text, title, subtitle));
  },
  onFocus: () => dispatch(doDeselect())
});

export default connect(null, mapDispatchToProps)(MyEditor);