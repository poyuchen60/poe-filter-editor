import React, { Component, Fragment } from 'react';
import { Grid, CssBaseline, Paper } from '@material-ui/core';
import Header from './Header';
import DataEditor from './components/DataEditor/DataEditor';

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
  deleteBlock
} from './actions'

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
})

class App extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { file, onFileSubmit } = this.props;
    file && onFileSubmit(file, Parser);
  }



  render() {
    const {
      editor, focusOn, order,
      onFileChange, onBlockFocus, onPropertyChange, onPropertiesChange,
      onDiscardChanges, onBlockDelete
    } = this.props;
    console.log(editor.get(0));
    const blocks = order && order.toJS().reduce( (accumulator, id, index) => {
      const block = editor.get(id);
      return block
        ? [...accumulator, {
          modified: !!block.get('modified'),
          block: (block.get('modified') || block.get('origin')).toJS(),
          id, index, active: focusOn === index
        }]
        : accumulator
    }, [])
    // const blocks = editor && editor.map( (b, index) => {
    //   if(!b) return undefined;
    //   const modified = tainted.get(index);
    //   const block = modified || b;
    //   return { modified: !!modified, block: block.toJS(), active: false }
    // }).toJS();
    //if(focusOn >= 0) blocks[focusOn].active = true;
    const id = focusOn >= 0 && order.get(focusOn);
    const block = editor.get(id);
    return (
      <Fragment>
        <CssBaseline />
        <Header onFileChange={onFileChange} onSubmit={this.handleSubmit} />
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <Paper style={{marginTop: '5px', height: '500px', overflowY: 'auto'}}>
              <BlockList
                blocks={blocks}
                focus={onBlockFocus}
                onBlockRestore={onDiscardChanges}
                onBlockDelete={onBlockDelete}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper style={{marginTop: '5px', height: '500px', overflowY: 'auto'}}>
              {block 
                && <BlockEditor
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
