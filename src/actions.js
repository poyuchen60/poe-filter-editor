export const types = {
  SAVE_ALL_BLOCKS: "SAVE_ALL_BLOCKS",
  SAVE_ONE_BLOCK: "SAVE_ONE_BLOCK",
  CHANGE_ONE_PROPERTY: "CHANGE_ONE_PROPERTY",
  CHANGE_PROPERTIES: "CHANGE_PROPERTIES",
  DISCARD_ALL_CHANGES: "DISCARD_ALL_CHANGES",
  DISCARD_ONE_CHANGE: "DISCARD_ONE_CHANGE",
  DISCARD_ALL_BLOCK_CHANGES: "DISCARD_ALL_BLOCK_CHANGES",
  DELETE_BLOCK: "DELETE_BLOCK",

  FILE_CHANGE: "FILE_CHANGE",
  READ_FILE_SUCCESS: "READ_FILE_SUCCESS",
  READ_FILE_PENDING: "READ_FILE_PENDING",
  READ_FILE_ERROR: "READ_FILE_ERROR",

  FOCUS_BLOCK: "FOCUS_BLOCK"
}

export const fileChange = (file) => ({
  type: types.FILE_CHANGE,
  file
})
export const readFile = (fileReader) => (dispatch) => {
  dispatch({type: types.READ_FILE_PENDING});
  fileReader
    .then(filter => dispatch({type: types.READ_FILE_SUCCESS, filter}))
    .catch(error => dispatch({type: types.READ_FILE_ERROR, error}))
}
export const focusBlock = index => ({
  type: types.FOCUS_BLOCK,
  index
})


export const changeOneProperty = (index, property, value) => ({
  type: types.CHANGE_ONE_PROPERTY,
  index, property, value
});
export const changeProperties = (index, block) => ({
  type: types.CHANGE_PROPERTIES,
  index, block
});
export const saveAllBlocks = () => ({
  type: types.SAVE_ALL_BLOCKS
});
export const saveOneBlock = (index) => ({
  type: types.SAVE_ONE_BLOCK,
  index
});
export const discardAllChanges = (index) => ({
  type: types.DISCARD_ALL_CHANGES,
  index
});
export const discardOneChange = (index, property) => ({
  type: types.DISCARD_ONE_CHANGE,
  index,property
});
export const discardAllBlockChanges = () => ({
  type: types.DISCARD_ALL_BLOCK_CHANGES
});
export const deleteBlock = (index) => ({
  type: types.DELETE_BLOCK,
  index
})