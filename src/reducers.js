import { types } from './actions';
import { Map, List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

const construct = data => {
  const ary = data.map( d => ({modified: undefined, origin: d}));
  return fromJS(ary);
}

const initialStateFile = {
  file: undefined,
  pendding: false,
  error: undefined
}
export const readFileReducer = (state=initialStateFile, action={}) => {
  switch(action.type){
    case types.FILE_CHANGE:
      return {file: action.file};
    case types.READ_FILE_PENDING:
      return {...state, pendding: true};
    case types.READ_FILE_SUCCESS:
      return {...state, pendding: false};
    case types.READ_FILE_ERROR:
      return {...state, pendding: false, error: action.error};
    default:
      return state;
  }
}


const initialStateFilter = {
  editor: List(),
  order: List()
}
const merger = (oldVal, newVal) => newVal || oldVal;
export const editFilterReducer = (state=initialStateFilter, action={}) => {
  const {editor, order } = state;
  const {index, property, value, type, filter, block} = action;
  switch(type){
    case types.READ_FILE_PENDING:
      return { editor: List(), order: List()}
    case types.READ_FILE_SUCCESS:
      return { editor: construct(filter), order: List([...Array(filter.length).keys()]) };
    case types.CHANGE_ONE_PROPERTY:
      return { order, editor: editor.update(index, b => {
        const body = b.get('modified') || b.get('origin');
        const modified = value === undefined
          ? body.delete(property)
          : body.set(property, fromJS(value));
        return b.set('modified', modified);
      })}

    case types.CHANGE_PROPERTIES:
      return { order, editor: editor.update(index, b => {
        let body = b.get('modified') || b.get('origin');
        Object.keys(block).forEach( k => {
          const v = block[k];
          body = v === undefined
            ? body.delete(k)
            : body.set(k, fromJS(v));
        });
        return b.set('modified', body);
      })}

    case types.SAVE_ONE_BLOCK:
      return { order, editor: editor.update(index, b => {
        const body = b.get('modified') || b.get('origin');
        return Map({ modified: undefined, origin: body });
      })}

    case types.SAVE_ALL_BLOCKS:
      return { order, editor: editor.map( b => {
        const body = b.get('modified') || b.get('origin');
        return Map({ modified: undefined, origin: body });
      })}

    case types.DISCARD_ALL_CHANGES:
      return { order, editor: editor.update(index, b => b.set('modified', undefined))}

    case types.DISCARD_ALL_BLOCK_CHANGES:
      return { order, editor: editor.map(b => b.set('modified', undefined))}

    case types.DELETE_BLOCK:
      return { order, editor: editor.set(index, undefined)}

    case types.CREATE_BLOCK:
      const newBlock = fromJS({modified: undefined, origin: {display: true}});
      return { order: order.unshift(editor.size), editor: editor.push(newBlock)};
    default:
      return state;
  }
}

const initialStateOperation = {
  focusOn: -1,
  version: 0,
}
export const operationReducer = (state=initialStateOperation, action={}) => {
  const { type, index } = action;
  const { focusOn, version } = state;
  switch(type){
    case types.READ_FILE_PENDING:
      return { focusOn: -1, version: version + 1}
    case types.FOCUS_BLOCK:
      return { focusOn: index, version};
    case types.DISCARD_ALL_BLOCK_CHANGES:
      return { focusOn: -1, version};
    case types.DELETE_BLOCK:
      return focusOn === index ? { focusOn: -1, version } : state;
    case types.CREATE_BLOCK:
      return { focusOn: focusOn >= 0 ? (focusOn + 1) : focusOn, version }
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  editFilterReducer,
  readFileReducer,
  operationReducer
});