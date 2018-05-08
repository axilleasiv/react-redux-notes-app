import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { doDeselect } from '../actions/note';
import { isNotDeleted } from '../selectors/note'
import { doUpdateEditor, doLoadEditor } from '../actions/editor';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';

const { hasCommandModifier } = KeyBindingUtil;
const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const plugins = [linkifyPlugin];


class MyEditor extends Component {
  constructor(props) {
    super(props);

    this.onTab = this.onTab.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.myKeyBindingFn = this.myKeyBindingFn.bind(this);
  }

  componentDidMount() {
    const { note, editorState, onLoad } = this.props;

    if (!editorState.loaded) {
      onLoad(editorState, note);
    }

    //EditorState.moveFocusToEnd(editorState);
    // if (this.refs.editor) {
    //   this.refs.editor.focus();
    // }
  }

  handleKeyCommand(command, editorState) {
    const { onChange } = this.props;
    // if (command === 'myeditor-save') {
    //   // Perform a request to save your contents, set
    //   // a new `editorState`, etc.
    //   return 'handled';
    // }
    // return 'not-handled';
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  myKeyBindingFn(e) {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  }

  //TO REMOVE
  mapKeyToEditorCommand(e) {
    const { onChange } = this.props;

    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  //https://github.com/SamyPesse/draft-js-code/blob/master/lib/onTab.js
  onTab(e) {
    e.preventDefault();
    return;
  }

  render() {
    const { onChange, onFocus, editorState, note } = this.props;

    return (
      <Editor
        placeholder="Write your note.."
        spellCheck={true}
        editorState={editorState.content}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={this.myKeyBindingFn}
        ref="editor"
        onChange={onChange}
        onFocus={onFocus}
        onTab={this.onTab}
        readOnly={!isNotDeleted(note)}
        plugins={plugins}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (editorState, note) => {
    dispatch(doLoadEditor(editorState, note));
  },
  onChange: (content) => {
    dispatch(doUpdateEditor(content))
  },
  onFocus: () => dispatch(doDeselect())
});

const mapStateToProps = ({ editorState }) => ({ editorState });

export default connect(mapStateToProps, mapDispatchToProps)(MyEditor);