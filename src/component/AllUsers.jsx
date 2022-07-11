import React, { useEffect, useState } from "react";
import { getUsers } from "../utils/firestore";

const AllUsers = ({ username }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      setUsers(await getUsers({ username }));
    })();
  }, [username]);
  return (
    <div>
      All users:
      <div>
        {users.map((user) => (
          <div key={user}>{user}</div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
