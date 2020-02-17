type User = {
  avatarUrl: string;
};

type Poll = {
  a: string;
  b: string;
};

type State = {
  hasSession: boolean;
  users: Array<User>;
  polls: Array<Poll>;
};

type Action =
  | { kind: "login" }
  | { kind: "logout" }
  | { kind: "poll-vote"; payload: { pollId: string; voteOption: string } }
  | { kind: "poll-create-new"; payload: Poll };

const initialState: State = {
  hasSession: false,
  users: [],
  polls: []
};

export const reducer = (action: Action, state: State): State => {
  switch (action.kind) {
    case "login":
      return {
        ...state,
        hasSession: true
      };
    case "logout":
      return {
        ...state,
        hasSession: false
      };
    case "poll-create-new":
      return {
        ...state,
        polls: [...state.polls, action.payload]
      };
    case "poll-vote":
      return initialState;

    default: {
      const x: never = action;
      return x;
    }
  }
};

// update(action, state) => {

// }

/// Basic example of the todo actions in typescript
type TodoAdd = {
  kind: "ADD_TODO";
  payload: {
    id: number;
    content: string;
  };
};

type TodoAction =
  | TodoAdd
  | { kind: "TOGGLE_TODO"; payload: { id: string } }
  | { kind: "SET_FILTER" };

const addTodo = (content: string): TodoAdd => {
  return {
    kind: "ADD_TODO",
    payload: {
      id: 3,
      content
    }
  };
};

{
  /* x = {
  name:"takle",
  age: 34,
}

Object.keys(x)    => ["name","age"]
Object.values(x)  => ["takle", 34]
Object.entries(x) => [["name","takle"],["age","34"]] */
}
