import React, { FC } from "react";
import { Link } from "react-router-dom";
import { HasQuestions } from "../redux/actions/questionActions";
import { HasUsers } from "../redux/actions/userActions";
import { mkQuestionShowRoute, routes } from "../routes";

export const Home: FC<HasQuestions & HasUsers> = ({ questions, users }) => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to={routes.home.unanswered}>unanswered</Link>
        <Link to={routes.home.answered}>answered</Link>
      </nav>
      <div>
        {Object.values(questions).map(q => {
          const author = users[q.author];
          return (
            <div
              key={q.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 10fr",
                alignItems: "center",
                border: "2px solid red"
              }}
            >
              <img
                style={{ height: "4rem", width: "4rem" }}
                src={author.avatarURL}
              />
              <div>
                <div>{q.author} says ...</div>
                <div>Would you rather... {q.optionOne.text} ...</div>
                <Link to={mkQuestionShowRoute(q.id)}>View Poll</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
