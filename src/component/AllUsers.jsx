import React, { useEffect, useState } from "react";
import { getUsers } from "../utils/firestore";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      setUsers(await getUsers());
    })();
  }, []);

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
