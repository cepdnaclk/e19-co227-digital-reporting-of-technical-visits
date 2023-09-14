import React, { useEffect, useState } from "react";
import "../Styles/UserCard.scss";
import { auth } from "../config/firebase";

const UserCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(user.photoURL)
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="user-card">
      {user ? (
        <div className="user-info">
          <img src={user.photoURL} alt="User" />
          <div className="user-details">
            <p>{user.displayName}</p>
            <p>{user.email}</p>
            
          </div>
        </div>
      ) : (
        <p>Guest User</p>
      )}
    </div>
  );
};

export default UserCard;
