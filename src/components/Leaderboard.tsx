import React, { FC } from "react";
import { HasUsers } from "../redux/actions/userActions";

type Props = HasUsers;

export const Leaderboard: FC<Props> = ({ users }) => {
  const viewModel = makeViewModel(users);

  return (
    <div>
      <h1>Leaderboard</h1>
      {viewModel.map(({ answerCount, questionCount, score, user }) => {
        return (
          <div key={user.id} style={{ paddingTop: "1rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 10fr",
                alignItems: "center",
                border: "2px solid red"
              }}
            >
              <img
                style={{ width: "4rem", height: "4rem" }}
                src={user.avatarURL}
                alt="user-image"
              />
              <div>
                <div>name: {user.name}</div>
                <div>answers: {answerCount}</div>
                <div>questions: {questionCount}</div>
                <div>score: {score}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const makeViewModel = (users: Props["users"]) => {
  const viewModel = Object.values(users).map(user => {
    const answerCount = Object.keys(user.answers).length;
    const questionCount = user.questions.length;
    const score = answerCount + questionCount;
    return {
      answerCount,
      questionCount,
      score,
      user
    };
  });

  viewModel.sort((a, b) => b.score - a.score);

  return viewModel;
};
