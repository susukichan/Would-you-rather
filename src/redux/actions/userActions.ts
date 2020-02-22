export type User = {
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, "optionOne" | "optionTwo">;
  questions: Array<string>;
};

type Users = Record<string, User>;
export type HasUsers = { users: Users };

type UserActionServerResponse = {
  type: "USER_SERVER_RESPONSE";
  payload: HasUsers;
};

export const userResponse = (users: Users): UserActionServerResponse => ({
  type: "USER_SERVER_RESPONSE",
  payload: {
    users
  }
});

export type UserAction = UserActionServerResponse;
