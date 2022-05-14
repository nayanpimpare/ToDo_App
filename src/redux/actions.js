export const ADD_LIST = "ADD_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const REMOVE_LIST = "REMOVE_LIST";

export const addToDo = (value) => ({
  type: ADD_LIST,
  value,
});

export const editToDO = (list) => ({
  type: EDIT_LIST,
  list,
});

export const removeToDO = (id) => ({
  type: REMOVE_LIST,
  id,
});
