import { HasQuestions, QuestionAction } from "../actions/questionActions";

const initialState: HasQuestions["questions"] = {};

export const questions = (
  state = initialState,
  action: QuestionAction
): HasQuestions["questions"] => {
  switch (action.type) {
    case "QUESTION_SERVER_RESPONSE": {
      return action.payload.questions;
    }
    default: {
      return state;
    }
  }
};
