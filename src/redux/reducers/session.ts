import { SessionAction, User } from "../sessionActions";

type SessionState = {
  user: User | undefined;
};

const initialState = {
  user: undefined
};

export const session = (
  state = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case "SESSION_LOGIN": {
      return { user: action.payload };
    }
    case "SESSION_LOGOUT": {
      return { user: undefined };
    }
    default: {
      return state;
    }
  }
};
