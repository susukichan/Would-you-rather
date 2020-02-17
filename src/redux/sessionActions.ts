export type SessionAction = SessionActionLogin | SessionActionLogout;

export type User = {
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, "optionOne" | "optionTwo">;
  questions: Array<string>;
};

type SessionActionLogin = { type: "SESSION_LOGIN"; payload: User };
type SessionActionLogout = { type: "SESSION_LOGOUT" };

export const login = (user: User): SessionActionLogin => {
  return { type: "SESSION_LOGIN", payload: user };
};

export const logout = (): SessionActionLogout => {
  return { type: "SESSION_LOGOUT" };
};
