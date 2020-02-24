import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { HasUser } from "../redux/actions/sessionActions";
import { routes } from "../routes";

export const Navigation: FC<HasUser & {
  onLogout: () => void;
}> = ({ user, onLogout }) => {
  return (
    <nav>
      <ul
        className="ui secondary pointing menu"
        style={{
          display: "flex",
          flexDirection: "row",
          listStyle: "none",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}
      >
        <li>
          <NavLink
            className="item"
            activeClassName="active"
            to={routes.home.unanswered}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="item"
            activeClassName="active"
            to={routes.question.new}
          >
            New Question
          </NavLink>
        </li>
        <li style={{ color: "#00b5ad" }}>
          <NavLink
            className="item"
            activeClassName="active"
            to={routes.leaderboard}
          >
            Leaderboard
          </NavLink>
        </li>
        <li className="right item">
          <img
            className="ui image"
            style={{ height: "2rem", width: "2rem" }}
            src={user.avatarURL}
            alt="user-avatar"
          />
        </li>
        <li className="menu">
          <button className="item" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
