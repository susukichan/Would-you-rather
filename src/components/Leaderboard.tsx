import React, { FC } from "react";
import { HasUsers } from "../redux/actions/userActions";

type Props = HasUsers;

export const Leaderboard: FC<Props> = ({ users }) => {
  const viewModel = makeViewModel(users);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div
        style={{
          height: "25rem",
          width: "25rem",
          boxShadow: "0px 0px 106px 14px rgba(235,235,235,1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        <h1 style={{ color: "#00b5ad" }}>Leaderboard</h1>
        {viewModel.map(({ answerCount, questionCount, score, user }) => {
          return (
            <div key={user.id} style={{ paddingTop: "1rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 9fr",
                  alignItems: "center",
                  border: "1px solid whitesmoke",
                  padding: "0.5rem"
                }}
              >
                <img
                  style={{ width: "4rem", height: "4rem" }}
                  src={user.avatarURL}
                  alt="user-image"
                />
                <div>
                  <div>
                    Name: <span style={{ color: "#00b5ad" }}>{user.name}</span>
                  </div>
                  <div>Answers: {answerCount}</div>
                  <div>Questions: {questionCount}</div>
                  <div>Score: {score}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
