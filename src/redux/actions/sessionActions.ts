export type User = {
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, "optionOne" | "optionTwo">;
  questions: Array<string>;
};

export type HasUser = {
  user: User;
};

type SessionActionLogin = { type: "SESSION_LOGIN"; payload: User };
export const login = (user: User): SessionActionLogin => {
  return { type: "SESSION_LOGIN", payload: user };
};

type SessionActionLogout = { type: "SESSION_LOGOUT" };
export const logout = (): SessionActionLogout => {
  return { type: "SESSION_LOGOUT" };
};

export type SessionAction = SessionActionLogin | SessionActionLogout;
