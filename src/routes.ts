export const mkQuestionShowRoute = (id: string) => `/questions/${id}`;

export const routes = {
  home: {
    answered: "/home/answered",
    unanswered: "/home/unanswered"
  },
  session: {
    login: "/login"
  },
  leaderboard: "/leaderboard",
  question: {
    new: "/add",
    show: mkQuestionShowRoute(":questionId")
  },
  status: {
    404: "/404"
  }
};
