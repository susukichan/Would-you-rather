import { combineReducers } from "redux";
import { session } from "./session";
import { questions } from "./questions";
import { users } from "./users";

export const rootReducer = combineReducers({ session, questions, users });

export type RootState = ReturnType<typeof rootReducer>;
