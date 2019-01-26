import React, { Component, Fragment } from 'react';
import { ClassEditor, BaseTypeEditor } from './ArrayEditor';
import ConstraintEditor from './ConstraintEditor';
import TypeEditor from './TypeEditor';
import ActionEditor from './ActionEditor';
import SocketEditor from './SocketEditor';

import { conditions } from '../../data/Classified';

class BlockEditor extends Component{
  state = {
    expanded: ''
  }

  handlePanelExpand = panel =>
    (_event, isExpanded) => this.setState({expanded: isExpanded ? panel : ''})

  render(){
    const { block: { 
      Class, BaseType
      }, onPropertyChange, onPropertiesChange,
      block, hidden
    } = this.props;
    const { handlePanelExpand } = this;
    const { expanded } = this.state;
    const { Constraint, Type, Action, Socket } = conditions;
    const [ constraints, types, actions, sockets ] = [Constraint, Type, Action, Socket].map( e => e.reduce( (props, p) => {
      const body = block[p];
      return body !== undefined ? {...props, [p]: body} : props;
    }, {}))
    return <div style={{display: hidden ? 'none' : 'block'}}>
      <ClassEditor 
        expanded={expanded === 'ClassEditor'}
        onPanelExpand={handlePanelExpand('ClassEditor')}
        selected={Class}
        onChange={onPropertyChange('Class')}
      />
      <BaseTypeEditor
        expanded={expanded === 'BaseTypeEditor'}
        onPanelExpand={handlePanelExpand('BaseTypeEditor')} 
        selected={BaseType}
        onChange={onPropertyChange('BaseType')}
      />
      <ConstraintEditor
        expanded={expanded === 'ConstraintEditor'}
        onPanelExpand={handlePanelExpand('ConstraintEditor')}
        constraints={constraints}
        onChange={onPropertyChange}
      />
      <SocketEditor
        expanded={expanded === 'SocketEditor'}
        onPanelExpand={handlePanelExpand('SocketEditor')}
        sockets={sockets}
        onChange={onPropertyChange}
      />
      <TypeEditor
        expanded={expanded === 'TypeEditor'}
        onPanelExpand={handlePanelExpand('TypeEditor')} 
        types={types}
        onChange={onPropertyChange}
      />
      <ActionEditor
        expanded={expanded === 'ActionEditor'}
        onPanelExpand={handlePanelExpand('ActionEditor')}
        actions={actions}
        onMultiChange={onPropertiesChange}
      />
    </div>
  }
}

export default BlockEditor;