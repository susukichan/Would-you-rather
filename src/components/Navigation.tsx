import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { HasUser, logout } from "../redux/actions/sessionActions";
import { routes } from "../routes";

export const Navigation: FC<HasUser> = ({ user }) => {
  const dispatch = useDispatch();
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
          />
        </li>
        <li className="menu">
          <button className="item" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
