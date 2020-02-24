import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
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
import { logout } from "./redux/actions/sessionActions";

export const App: FC = () => {
  const state = useSelector((state: RootState) => state);
  const { questions, users, session } = state;
  const dispatch = useDispatch();
  const history = useHistory();

  const [pathname, setPathname] = useState(routes.home.unanswered);

  useEffect(() => {
    dispatch(requestQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(requestUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    if (session.userId) {
      history.push(pathname);
    } else {
      setPathname(
        [
          window.location.pathname === "/",
          window.location.pathname === routes.home.unanswered,
          window.location.pathname === routes.session.login
        ].some(x => x)
          ? routes.home.unanswered
          : window.location.pathname
      );
      history.push(routes.session.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.userId]);

  return (
    <div>
      {session.userId && (
        <Navigation
          onLogout={() => {
            history.push(routes.home.unanswered);
            dispatch(logout());
          }}
          user={users[session.userId]}
        />
      )}
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
            if (!question) {
              return <Redirect to={routes.status[404]}></Redirect>;
            }
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

        <Route>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh"
            }}
          >
            <h1 style={{ color: "#00b5ad" }}>404 not found</h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
};
