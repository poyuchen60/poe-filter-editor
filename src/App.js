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
  tainted: state.editFilterReducer.tainted,
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
      editor, tainted, focusOn,
      onFileChange, onBlockFocus, onPropertyChange, onPropertiesChange,
      onDiscardChanges, onBlockDelete
    } = this.props;

    const blocks = editor && editor.map( (b, index) => {
      if(!b) return undefined;
      const modified = tainted.get(index);
      const block = modified || b;
      return { modified: !!modified, block: block.toJS(), active: false }
    }).toJS();
    if(focusOn >= 0) blocks[focusOn].active = true;

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
              {focusOn >= 0 
                && <BlockEditor
                  block={(tainted.get(focusOn) || editor.get(focusOn)).toJS()}
                  onPropertyChange={onPropertyChange(focusOn)}
                  onPropertiesChange={onPropertiesChange(focusOn)}
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
