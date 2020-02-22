import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/sessionActions";
import { HasUsers } from "../redux/actions/userActions";

export const Login: FC<HasUsers> = ({ users }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<string>("");
  return (
    <div>
      <h1>You must login</h1>
      <select onChange={e => setSelectedUser(e.currentTarget.value)}>
        <option value="">--Please choose an option--</option>
        {Object.entries(users).map(([id, user]) => (
          <option key={id} value={id}>
            {user.name}
          </option>
        ))}
      </select>
      <button
        disabled={selectedUser === ""}
        onClick={() => {
          dispatch(login(users[selectedUser]));
        }}
      >
        login
      </button>
    </div>
  );
};
