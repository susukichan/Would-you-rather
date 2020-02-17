import { combineReducers } from "redux";
import { todos } from "./todos";
import { session } from "./session";

export const root = combineReducers({ todos, session });

export type RootState = {
  todos: ReturnType<typeof todos>;
  session: ReturnType<typeof session>;
};
