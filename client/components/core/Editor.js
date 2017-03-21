import React, {PropTypes} from 'react'
import {Editor as DraftEditor} from 'react-draft-wysiwyg'
import {EditorState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import {stateFromHTML} from 'draft-js-import-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(props.value))
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

  onEditorStateChange(editorState) {
    const contentState = editorState.getCurrentContent()

    const value = this.props.plainText ?
      this.returnText(contentState) :
      this.returnHtml(contentState)

    this.props.onContentChange(value)
    this.setState({editorState})
  }

  returnHtml(contentState) {
    return contentState.hasText() ? stateToHTML(contentState) : ''
  }

  returnText(contentState) {
    return contentState.getPlainText()
  }

  render() {
    return <DraftEditor
      editorState={this.state.editorState}
      onEditorStateChange={this.onEditorStateChange}
      toolbarClassName="editor-toolbar"
      wrapperClassName="editor-wrapper"
      editorClassName="editor-content"
      {...this.props}
    />
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  plainText: PropTypes.bool,
  onContentChange: PropTypes.func
}
Editor.defaultProps = {
  value: '',
  plainText: false,
  onContentChange: null
}

export default Editor
