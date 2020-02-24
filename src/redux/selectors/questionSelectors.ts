import { HasQuestions } from "../actions/questionActions";
import { RootState } from "../reducers/root";

export const getUnansweredQuestions = ({
  session,
  users,
  questions
}: RootState): Array<HasQuestions["questions"][0]> => {
  if (!session.userId) {
    return [];
  }
  const user = users[session.userId];
  const copy = { ...questions };
  Object.keys(user.answers).forEach(questionId => {
    delete copy[questionId];
  });

  const xs = Object.values(copy).sort((a, b) => b.timestamp - a.timestamp);
  return xs;
};

export const getAnsweredQuestions = ({
  session,
  users,
  questions
}: RootState): Array<HasQuestions["questions"][0]> => {
  if (!session.userId) {
    return [];
  }
  const user = users[session.userId];
  const copy = Object.keys(user.answers).reduce((acc, questionId) => {
    acc[questionId] = { ...questions[questionId] };

    return acc;
  }, {} as HasQuestions["questions"]);

  const xs = Object.values(copy).sort((a, b) => b.timestamp - a.timestamp);
  return xs;
};
