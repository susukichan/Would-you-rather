import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { _getUsers, _getQuestions } from "./dataBase/_DATA";
import { login, logout, User } from "./redux/sessionActions";
import { RootState } from "./redux/reducers/root";

type UsersDB = Record<string, User>;

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

type HasQuestions = { questions: Questions };

const Home: FC<HasQuestions & { title: string }> = ({ questions, title }) => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/home/unanswered">unanswered</Link>
        <Link to="/home/answered">answered</Link>
      </nav>

      <p>{title}</p>

      <pre>
        <code>{JSON.stringify(questions, null, 2)}</code>
      </pre>
    </div>
  );
};

const PollCreate: FC = () => {
  return <h1>NewQuestion</h1>;
};

const Leaderboard: FC = () => {
  return <h1>Leaderboard</h1>;
};

const getUnansweredQuestions = (
  user: RootState["session"]["user"],
  questions?: Questions
): Questions => {
  if (!user) {
    return {};
  }
  if (!questions) {
    return {};
  }

  const copy = { ...questions };

  Object.keys(user.answers).forEach(questionId => {
    delete copy[questionId];
  });

  return copy;
};

const getAnsweredQuestions = (
  user: RootState["session"]["user"],
  questions?: Questions
): Questions => {
  if (!user) {
    return {};
  }
  if (!questions) {
    return {};
  }

  const copy = Object.keys(user.answers).reduce((acc, questionId) => {
    acc[questionId] = { ...questions[questionId] };

    return acc;
  }, {});

  return copy;
};

export const App: FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [users, setUsers] = useState<UsersDB>({});
  const [questions, setQuestions] = useState<Questions>({});

  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    _getUsers().then(rsp => setUsers(rsp as UsersDB));
  }, []);

  useEffect(() => {
    _getQuestions().then(rsp => setQuestions(rsp as Questions));
  }, []);

  const unansweredQuestions = getUnansweredQuestions(
    state.session.user,
    questions
  );

  const answeredQuestions = getAnsweredQuestions(state.session.user, questions);

  console.log({ state, unansweredQuestions, questions });

  useEffect(() => {
    if (state.session.user) {
      history.push("/home/unanswered");
    } else {
      history.push("/session/login");
    }
  }, [state.session.user]);

  return (
    <div>
      {state.session.user && (
        <nav>
          <ul
            style={{ display: "flex", flexDirection: "row", listStyle: "none" }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/poll/create">New Question</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}

      <Switch>
        <Route path="/session/login">
          <div>
            <h1>You must login</h1>
            <select onChange={e => setSelectedUser(e.currentTarget.value)}>
              <option value="">--Please choose an option--</option>
              {Object.entries(users).map(([id, user]) => (
                <option key={id} value={id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              disabled={selectedUser === ""}
              onClick={() => {
                dispatch(login(users[selectedUser]));
              }}
            >
              login
            </button>
          </div>
        </Route>
        <Route path="/poll/create">
          <PollCreate></PollCreate>
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/home/unanswered">
          <Home title="unanswered" questions={unansweredQuestions} />
        </Route>
        <Route path="/home/answered">
          <Home title="answered" questions={answeredQuestions} />
        </Route>
      </Switch>
    </div>
  );
};
