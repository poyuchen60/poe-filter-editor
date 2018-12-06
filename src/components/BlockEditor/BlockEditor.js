import React, { Component, Fragment } from 'react';
import { ClassEditor } from './ArrayEditor';
import ConstraintEditor from './ConstraintEditor';
import TypeEditor from './TypeEditor';
import ActionEditor from './ActionEditor';

import { conditions } from '../../data/Classified';

class BlockEditor extends Component{
  render(){
    const { block: { 
      Class, BaseType
    }, onPropertyChange, onPropertiesChange,
    onItemChange, block } = this.props;
    const { Constraint, Type, Action } = conditions;
    const [ constraints, types, actions ] = [Constraint, Type, Action].map( e => e.reduce( (props, p) => {
      const body = block[p];
      return body !== undefined ? {...props, [p]: body} : props;
    }, {}))

    return <Fragment>
      <ClassEditor 
        selected={Class}
        onChange={onPropertyChange('Class')}
      />
      <ConstraintEditor
        constraints={constraints}
        onChange={onPropertyChange}
      />
      <TypeEditor 
        types={types}
        onChange={onPropertyChange}
      />
      <ActionEditor
        actions={actions}
        onChange={onPropertyChange}
        onMultiChange={onPropertiesChange}
      />
    </Fragment>
  }
}

export default BlockEditor;