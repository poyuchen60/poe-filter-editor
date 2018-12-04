import { types } from './actions';
import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

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
  editor: undefined,
  tainted: undefined
}
const merger = (oldVal, newVal) => newVal || oldVal;
export const editFilterReducer = (state=initialStateFilter, action={}) => {
  const {editor, tainted } = state;
  const {index, property, value, type, filter, block} = action;
  let newVal;
  switch(type){
    case types.READ_FILE_SUCCESS:
      return {editor: fromJS(filter), tainted: List()};
    case types.CHANGE_ONE_PROPERTY:
      return {editor, tainted: tainted.update(index,
        b => {
          b = b ? b : editor.get(index);
          return value === undefined
            ? b.delete(property)
            : b.set(property, fromJS(value));
        })};
    case types.CHANGE_PROPERTIES:
      return {editor, tainted: tainted.update(index,
        b => {
          b = b ? b : editor.get(index);
          Object.keys(block).forEach( k => {
            const v = block[k]
            if(v === undefined){
              b = b.delete(k)
            } else {
              b = b.set(k, fromJS(v))
            }
          })
          // block.forEach((v, k) => {
          //   if(v === undefined){
          //     b = b.delete(k)
          //   } else {
          //     b = b.set(k, fromJS(v))
          //   }
          // })
          return b;
        } )}
    case types.SAVE_ONE_BLOCK:
      newVal = tainted.get(index);
      return newVal === undefined 
        ? state
        : {editor: editor.set(index, newVal), tainted: tainted.set(index, undefined)};
    case types.SAVE_ALL_BLOCKS:
      return {editor: editor.mergeWith(merger, tainted), tainted: tainted.clear()};
    case types.DISCARD_ALL_CHANGES:
      return {editor, tainted: tainted.set(index, undefined)};
    case types.DISCARD_ALL_BLOCK_CHANGES:
      return {editor, tainted: tainted.clear()};
    case types.DELETE_BLOCK:
      return {editor: editor.delete(index), tainted: tainted.delete(index)}
    default:
      return state;
  }
}

const initialStateOperation = {
  focusOn: -1,
}
export const operationReducer = (state=initialStateOperation, action={}) => {
  const { type, index } = action;
  const { focusOn } = state;
  switch(type){
    case types.FOCUS_BLOCK:
      return { focusOn: index};
    case types.DISCARD_ALL_BLOCK_CHANGES:
      return { focusOn: -1};
    case types.DELETE_BLOCK:
      let i;
      if(focusOn === index)
        i = -1;
      else
        i = focusOn > index ? focusOn - 1 : focusOn;
      return { focusOn: i}
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  editFilterReducer,
  readFileReducer,
  operationReducer
});