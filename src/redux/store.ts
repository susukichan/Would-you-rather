import { createStore } from "redux";
import { root } from "./reducers/root";

export const store = createStore(root);
