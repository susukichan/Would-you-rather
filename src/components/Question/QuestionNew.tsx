import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { newQuestion } from "../../redux/thunks/questionThunks";
import { HasUser } from "../../redux/actions/sessionActions";
import { routes } from "../../routes";

export const QuestionNew: FC<HasUser> = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
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
        className="ui card"
      >
        <h1 style={{ color: "#00b5ad" }}>New Question</h1>
        <div>
          <h3>Would your rather...</h3>
          <label>Option A</label>
          <div
            className="ui input"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <input
              type="text"
              onChange={e => setOptionOneText(e.currentTarget.value)}
              value={optionOneText}
            />
          </div>
          <label>Option B</label>
          <div
            className="ui input"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <input
              type="text"
              onChange={e => setOptionTwoText(e.currentTarget.value)}
              value={optionTwoText}
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              dispatch(
                newQuestion({
                  optionOneText,
                  optionTwoText,
                  authorId: user.id
                })
                // @ts-ignore TODO fix types
              ).then(() => {
                history.push(routes.home.unanswered);
              });
            }}
            className="ui teal button"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
