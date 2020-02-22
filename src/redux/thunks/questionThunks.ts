import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers/root";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "../../dataBase/_DATA";
import { HasQuestions, questionResponse } from "../actions/questionActions";

// TODO `Action` doesn't seem like the thing I want?
export const requestQuestions = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  const questions = (await _getQuestions()) as HasQuestions["questions"];

  dispatch(questionResponse(questions));
};

type NewQuestionInput = {
  optionOneText: string;
  optionTwoText: string;
  authorId: string;
};
export const newQuestion = ({
  optionOneText,
  optionTwoText,
  authorId
}: NewQuestionInput): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  await _saveQuestion({
    optionOneText,
    optionTwoText,
    author: authorId
  });

  const questions = (await _getQuestions()) as HasQuestions["questions"];
  dispatch(questionResponse(questions));
};

type AnswerQuestionInput = {
  option: "optionOne" | "optionTwo";
  questionId: string;
  userId: string;
};
export const answerQuestion = ({
  option,
  questionId,
  userId
}: AnswerQuestionInput): ThunkAction<
  Promise<HasQuestions["questions"][0]>,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  await _saveQuestionAnswer({
    authedUser: userId,
    qid: questionId,
    answer: option
  });

  const questions = (await _getQuestions()) as HasQuestions["questions"];
  dispatch(questionResponse(questions));

  return questions[questionId];
};
