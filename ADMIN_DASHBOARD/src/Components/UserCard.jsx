import React, { useEffect, useState } from "react";
import styles from "../Styles/UserCard.module.scss";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className={styles.user_card}>
      {user ? (
        <div className={styles.user_info}>
          <img src={user.photoURL} alt="User" />
          <div className={styles.user_details}>
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
