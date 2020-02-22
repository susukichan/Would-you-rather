export const mkQuestionShowRoute = (id: string) => `/questions/${id}`;

export const routes = {
  home: {
    answered: "/home/answered",
    unanswered: "/home/unanswered"
  },
  session: {
    login: "/session/login"
  },
  leaderboard: "/leaderboard",
  question: {
    new: "/questions/new",
    show: mkQuestionShowRoute(":questionId")
  }
};
