import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { HasQuestions } from "../redux/actions/questionActions";
import { HasUsers } from "../redux/actions/userActions";
import { mkQuestionShowRoute, routes } from "../routes";

export const Home: FC<{
  questions: Array<HasQuestions["questions"][0]>;
} & HasUsers> = ({ questions, users }) => {
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <nav
        className="ui tabular menu"
        style={{
          marginTop: "4rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <NavLink
          activeClassName="active"
          className="item"
          style={{ backgroundColor: "whitesmoke" }}
          to={routes.home.unanswered}
        >
          unanswered
        </NavLink>
        <NavLink
          activeClassName="active"
          className="item"
          style={{ backgroundColor: "whitesmoke" }}
          to={routes.home.answered}
        >
          answered
        </NavLink>
      </nav>
      <div>
        {questions.map(q => {
          const author = users[q.author];
          return (
            <div
              key={q.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 10fr",
                alignItems: "center",
                border: "2px solid whitesmoke",
                boxShadow: "0px 0px 106px 14px rgba(235,235,235,1)",
                marginBottom: "1rem",
                padding: "1rem"
              }}
            >
              <img
                style={{ height: "7rem", width: "7rem", marginRight: "1rem" }}
                src={author.avatarURL}
                alt="user-avatar"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                  {q.author} says ...
                </div>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  Would you rather...
                </div>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  {q.optionOne.text} ...
                </div>
                <Link
                  className="ui teal button"
                  style={{ margin: "0 auto", width: "144px" }}
                  to={mkQuestionShowRoute(q.id)}
                >
                  View Poll
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
