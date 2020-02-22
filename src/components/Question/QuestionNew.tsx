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
    <div>
      <h1>NewQuestion</h1>
      <div>
        <h2>Would your rather...</h2>
        <p>Option A</p>
        <input
          type="text"
          onChange={e => setOptionOneText(e.currentTarget.value)}
          value={optionOneText}
        />
        <p>Option B</p>
        <input
          type="text"
          onChange={e => setOptionTwoText(e.currentTarget.value)}
          value={optionTwoText}
        />
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
        >
          submit
        </button>
      </div>
    </div>
  );
};
