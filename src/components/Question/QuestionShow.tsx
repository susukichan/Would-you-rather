import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { HasQuestions } from "../../redux/actions/questionActions";
import { answerQuestion } from "../../redux/thunks/questionThunks";
import { HasUser } from "../../redux/actions/sessionActions";

type Props = {
  question: HasQuestions["questions"][0];
  user: HasUser["user"];
  author: HasUser["user"];
};

export const QuestionShow: FC<Props> = ({ user, question, author }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<"optionOne" | "optionTwo">(
    "optionOne"
  );
  const [result, setResult] = useState<
    undefined | HasQuestions["questions"][0]
  >();

  if (result) {
    return <ShowResult author={author} question={result} />;
  } else {
    return (
      <div>
        {author.name} Asks...
        <div>
          <img
            style={{ width: "4rem", height: "4rem" }}
            src={author.avatarURL}
          />
          <div>
            <h1>Would you rather...</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                dispatch(
                  answerQuestion({
                    userId: user.id,
                    questionId: question.id,
                    option: selected
                  })
                  // @ts-ignore
                ).then(question => {
                  setResult(question);
                });
              }}
            >
              <div>
                <label>
                  <input
                    checked={selected === "optionOne"}
                    type="radio"
                    onChange={() => setSelected("optionOne")}
                  />
                  {question.optionOne.text}
                </label>
              </div>
              <div>
                <label>
                  <input
                    checked={selected === "optionTwo"}
                    type="radio"
                    onChange={() => setSelected("optionTwo")}
                  />
                  {question.optionTwo.text}
                </label>
              </div>
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

const ShowResult: FC<Pick<Props, "author" | "question">> = ({
  question: { optionOne, optionTwo },
  author
}) => {
  const oneVoteCount = optionOne.votes.length;
  const twoVoteCount = optionTwo.votes.length;
  const totalVotes = oneVoteCount + twoVoteCount;

  return (
    <div>
      <h1>Asked by {author.name}...</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 10fr",
          alignItems: "center",
          border: "2px solid red"
        }}
      >
        <img style={{ width: "4rem", height: "4rem" }} src={author.avatarURL} />
        <div>
          <h2>Results:</h2>
          <div>
            <Option
              text={optionOne.text}
              count={oneVoteCount}
              total={totalVotes}
            />
          </div>
          <div>
            <Option
              text={optionTwo.text}
              count={twoVoteCount}
              total={totalVotes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Option: FC<{
  text: string;
  count: number;
  total: number;
}> = ({ text, count, total }) => {
  const percentage = count / total;

  return (
    <div>
      <h3>{text}</h3>
      <p>
        {count} out of {total}
      </p>
      <div style={{ height: "1rem", display: "flex" }}>
        <div
          style={{
            height: "1rem",
            backgroundColor: "teal",
            flex: percentage
          }}
        ></div>
        <div
          style={{
            height: "1rem",
            backgroundColor: "whitesmoke",
            flex: 1 - percentage
          }}
        ></div>
      </div>
    </div>
  );
};
