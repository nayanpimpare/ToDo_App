export const ADD_LIST = "ADD_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const REMOVE_LIST = "REMOVE_LIST";

export const addToDo = (payload) => ({
  type: ADD_LIST,
  payload,
});

export const editToDO = (list) => ({
  type: EDIT_LIST,
  list,
});

export const removeToDO = (id) => ({
  type: REMOVE_LIST,
  id,
});
