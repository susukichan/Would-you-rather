import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { _getUsers } from "../../dataBase/_DATA";
import { RootState } from "../reducers/root";
import { HasUsers, userResponse } from "../actions/userActions";

// TODO `Action` doesn't seem like the thing I want?
export const requestUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  const users = (await _getUsers()) as HasUsers["users"];

  dispatch(userResponse(users));
};
