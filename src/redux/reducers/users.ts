import { HasUsers, UserAction } from "../actions/userActions";

const initialState: HasUsers["users"] = {};

export const users = (
  state = initialState,
  action: UserAction
): HasUsers["users"] => {
  switch (action.type) {
    case "USER_SERVER_RESPONSE": {
      return action.payload.users;
    }
    default: {
      return state;
    }
  }
};
