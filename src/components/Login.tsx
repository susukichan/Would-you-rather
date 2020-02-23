import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/sessionActions";
import { HasUsers } from "../redux/actions/userActions";

// const mk = (s: string) => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: s
// });

// const x = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh"
// };

export const Login: FC<HasUsers> = ({ users }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<string>("");
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
        <h1 style={{ color: "#00b5ad" }}>Would you rather login?</h1>
        <select
          style={{ height: "3rem" }}
          onChange={e => setSelectedUser(e.currentTarget.value)}
        >
          <option value="">--Please choose an option--</option>
          {Object.entries(users).map(([id, user]) => (
            <option key={id} value={id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="ui teal button"
          disabled={selectedUser === ""}
          onClick={() => {
            dispatch(login(users[selectedUser]));
          }}
        >
          login
        </button>
      </div>
    </div>
  );
};
