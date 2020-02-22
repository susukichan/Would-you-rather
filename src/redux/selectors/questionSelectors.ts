import { HasQuestions } from "../actions/questionActions";
import { RootState } from "../reducers/root";

export const getUnansweredQuestions = ({
  session,
  users,
  questions
}: RootState): HasQuestions["questions"] => {
  if (!session.userId) {
    return {};
  }
  const user = users[session.userId];
  const copy = { ...questions };
  Object.keys(user.answers).forEach(questionId => {
    delete copy[questionId];
  });

  return copy;
};

export const getAnsweredQuestions = ({
  session,
  users,
  questions
}: RootState): HasQuestions["questions"] => {
  if (!session.userId) {
    return {};
  }
  const user = users[session.userId];
  const copy = Object.keys(user.answers).reduce((acc, questionId) => {
    acc[questionId] = { ...questions[questionId] };

    return acc;
  }, {});

  return copy;
};
