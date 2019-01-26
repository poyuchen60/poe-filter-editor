import React, { Component, Fragment } from 'react';
import { Grid, CssBaseline, Paper } from '@material-ui/core';
import Header from './Header';
import Builder from './Builder';

import BlockList from './BlockList';
import Parser from './Parser';
import BlockEditor from './components/BlockEditor/BlockEditor';
import { connect } from 'react-redux';
import {
  fileChange,
  readFile,
  focusBlock,
  changeOneProperty,
  changeProperties,
  saveAllBlocks,
  discardAllBlockChanges,
  discardAllChanges,
  deleteBlock,
  createBlock
} from './actions'
import { array } from 'prop-types';

const readFileAsText = (file, parser=undefined) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const data = parser ? parser(reader.result) : reader.result;
      resolve(data);
    };
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Error on file reading"));
    }

    reader.readAsText(file);
  });
}

const mapStateToProps = (state) => ({
  isPendding: state.readFileReducer.isPendding,
  file: state.readFileReducer.file,
  editor: state.editFilterReducer.editor,
  order: state.editFilterReducer.order,
  focusOn: state.operationReducer.focusOn,
  version: state.operationReducer.version,
});

const mapDispatchToProps = (dispatch) => ({
  onBlockFocus: (index) => () => dispatch(focusBlock(index)),
  onFileChange: (event) => dispatch(fileChange(event.target.files[0])),
  onFileSubmit: (file, parser) => dispatch(readFile(readFileAsText(file, parser))),
  onPropertyChange: (index) => (property) => (value) => dispatch(changeOneProperty(index, property, value)),
  onPropertiesChange: (index) => (block) => dispatch(changeProperties(index, block)),
  onSaveAllBlocks: () => dispatch(saveAllBlocks()),
  onDiscardAllBlockChanges: () => dispatch(discardAllBlockChanges()),
  onDiscardChanges: (index) => dispatch(discardAllChanges(index)),
  onBlockDelete: (index) => dispatch(deleteBlock(index)),
  onCreateBlock: () => dispatch(createBlock()),
})

class App extends Component {
  constructor(props){
    super(props);
    this.linkRef = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { file, onFileSubmit } = this.props;
    file && onFileSubmit(file, Parser);
  };
  handleDownload = () => {
    let { order, editor } = this.props;
    order = order.toJS();
    editor = editor.toJS();
    const ordered = order
      .filter( index => editor[index])
      .reduce( (e, index) => [...e, editor[index]], Map)
      .map( b => b.modified || b.origin );
    const linkNode = this.linkRef.current;
    const blob = new Blob([Builder(ordered)], {type: 'text/plain'});
    linkNode.href = URL.createObjectURL(blob);
    linkNode.download = "test.filter";
    linkNode.click();
  };

  render() {
    const {
      editor, focusOn, order, version,
      onFileChange, onBlockFocus, onPropertyChange, onPropertiesChange,
      onDiscardChanges, onBlockDelete, onCreateBlock
    } = this.props;
    const { handleDataEditorOpen, handleDownload, handleSubmit } = this;

    const blocks = order && order.toJS().reduce( (accumulator, id, index) => {
      const block = editor.get(id);
      return block
        ? [...accumulator, {
          modified: !!block.get('modified'),
          block: (block.get('modified') || block.get('origin')).toJS(),
          id, index, active: focusOn === index
        }]
        : accumulator
    }, []);

    const id = focusOn >= 0 && order.get(focusOn);
    const block = editor.get(id);

    return (
      <Fragment>
        <a ref={this.linkRef} style={{display: 'none'}}></a>
        <CssBaseline />
        <Header
          onFileChange={onFileChange}
          onSubmit={handleSubmit}
          onCreateBlock={onCreateBlock}
        />
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <Paper style={{marginTop: '5px', height: '500px', overflowY: 'auto'}}>
              <BlockList
                key={version}
                blocks={blocks}
                focus={onBlockFocus}
                onBlockRestore={onDiscardChanges}
                onBlockDelete={onBlockDelete}
                onDownload={handleDownload}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper style={{marginTop: '5px', height: '500px', overflowY: 'auto'}}>
              {block 
                && <BlockEditor
                  hidden={false}
                  block={(block.get('modified') || block.get('origin')).toJS()}
                  onPropertyChange={onPropertyChange(id)}
                  onPropertiesChange={onPropertiesChange(id)}
                />
              }
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
