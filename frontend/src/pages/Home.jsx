import { getAllUsers } from "../utils/apiUser";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUsers();
        setUserData(result.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {userData &&
        userData.map((user) => (
          <div key={user.id}>
            <div className="flex flex-col list-none">
              <li> {user.username}</li>
              <li>{user.password}</li>
            </div>
          </div>
        ))}
    </div>
  );
}
