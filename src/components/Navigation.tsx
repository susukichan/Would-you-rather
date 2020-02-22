import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HasUser, logout } from "../redux/actions/sessionActions";
import { routes } from "../routes";

export const Navigation: FC<HasUser> = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <nav
      style={{
        padding: "0.5rem 0",
        backgroundColor: "whitesmoke"
      }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          listStyle: "none",
          justifyContent: "space-between"
        }}
      >
        <li>
          <Link to={routes.home.unanswered}>Home</Link>
        </li>
        <li>
          <Link to={routes.question.new}>New Question</Link>
        </li>
        <li>
          <Link to={routes.leaderboard}>Leaderboard</Link>
        </li>
        <li>
          <img style={{ height: "2rem", width: "2rem" }} src={user.avatarURL} />
        </li>
        <li>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};
