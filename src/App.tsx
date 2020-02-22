import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { Home } from "./components/Home";
import { Leaderboard } from "./components/Leaderboard";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { QuestionNew } from "./components/Question/QuestionNew";
import { QuestionShow } from "./components/Question/QuestionShow";
import { RootState } from "./redux/reducers/root";
import {
  getAnsweredQuestions,
  getUnansweredQuestions
} from "./redux/selectors/questionSelectors";
import { requestQuestions } from "./redux/thunks/questionThunks";
import { requestUsers } from "./redux/thunks/userThunks";
import { routes } from "./routes";

export const App: FC = () => {
  const state = useSelector((state: RootState) => state);
  const { questions, users, session } = state;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(requestQuestions());
  }, []);

  useEffect(() => {
    dispatch(requestUsers());
  }, [questions]);

  useEffect(() => {
    if (session.userId) {
      history.push(routes.home.unanswered);
    } else {
      history.push("/session/login");
    }
  }, [session.userId]);

  return (
    <div>
      {session.userId && <Navigation user={users[session.userId]} />}
      <Switch>
        <Route path={routes.session.login}>
          <Login users={users} />
        </Route>
        <Route path={routes.question.new}>
          {session.userId && <QuestionNew user={users[session.userId]} />}
        </Route>
        <Route
          path={routes.question.show}
          render={props => {
            if (!session.userId) {
              return null;
            }

            const question = questions[props.match.params.questionId];
            const author = users[question.author];

            return (
              <QuestionShow
                question={question}
                user={users[session.userId]}
                author={author}
              />
            );
          }}
        ></Route>
        <Route path={routes.leaderboard}>
          <Leaderboard users={users} />
        </Route>
        <Route
          path={routes.home.unanswered}
          render={() => (
            <Home questions={getUnansweredQuestions(state)} users={users} />
          )}
        />
        <Route
          path={routes.home.answered}
          render={() => (
            <Home questions={getAnsweredQuestions(state)} users={users} />
          )}
        />
      </Switch>
    </div>
  );
};
