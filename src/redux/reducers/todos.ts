import { ADD_TODO } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export const todos = function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }

    default:
      return state;
  }
};
