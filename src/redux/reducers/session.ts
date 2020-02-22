import { SessionAction, HasUser } from "../actions/sessionActions";

type SessionState = { userId: HasUser["user"]["id"] | undefined };

const initialState: SessionState = {
  userId: undefined
};

export const session = (
  state = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case "SESSION_LOGIN": {
      return { userId: action.payload.id };
    }
    case "SESSION_LOGOUT": {
      return { userId: undefined };
    }
    default: {
      return state;
    }
  }
};
