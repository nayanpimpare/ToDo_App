import { ADD_LIST, EDIT_LIST, REMOVE_LIST } from "./actions";

const initialState = {
  todoList: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:      
      return {
        todoList: [
          ...state.todoList,
          {
            id: state.todoList.length + 1,
            value: action.payload.value,
            date: new Date(action.payload.selectedDate).toISOString(),
          },
        ],
      };

    case EDIT_LIST:
      return {
        todoList: [...state.todoList],
      };

    case REMOVE_LIST:
      return {
        todoList: [...state.todoList.filter((i) => i.id !== +action.id)],
      };

    default:
      return state;
  }
};

export default reducer;
