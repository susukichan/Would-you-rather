type Questions = Record<
  string,
  {
    id: string;
    author: string;
    timestamp: number;
    optionOne: {
      votes: Array<string>;
      text: string;
    };
    optionTwo: {
      votes: Array<string>;
      text: string;
    };
  }
>;

export type HasQuestions = { questions: Questions };

type QuestionActionServerResponse = {
  type: "QUESTION_SERVER_RESPONSE";
  payload: HasQuestions;
};

export const questionResponse = (
  questions: Questions
): QuestionActionServerResponse => ({
  type: "QUESTION_SERVER_RESPONSE",
  payload: {
    questions
  }
});

export type QuestionAction = QuestionActionServerResponse;
