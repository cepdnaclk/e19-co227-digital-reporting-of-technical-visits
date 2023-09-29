import React, { useEffect, useState, useRef } from "react";
import styles from "../Styles/UserCard.module.scss";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // New state variable
  const navigate = useNavigate();

  const logoutButtonRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        navigate("/");
      }
    });

    // Cleanup code for the auth state listener
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = () => {
    // Show the logout confirmation dialog
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    // Perform the logout action
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });

    // Hide the logout confirmation dialog
    setShowLogoutDialog(false);
  };

  const toggleLogoutButton = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  const cancelLogout = () => {
    // Hide the logout confirmation dialog
    setShowLogoutDialog(false);
  };

  return (
    <>
      <div
        className={styles.user_card}
        onClick={() => {
          toggleLogoutButton();
        }}
      >
        <div className={styles.user_info}>
          <img src={user ? user.photoURL : ""} alt="User" />
          <div className={styles.user_details}>
            <p>{user ? user.displayName : "Guest User"}</p>
            <p>{user ? user.email : ""}</p>
          </div>
        </div>
        {showLogoutButton && (
          <button onClick={handleLogout} className={styles.logout_button}>
            Logout
          </button>
        )}
      </div>
      {showLogoutDialog && (
        <div className={styles.logout_dialog}>
          <p>Are you sure you want to log out?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
      {showLogoutDialog && (
        <div
          className={styles.overlay}
          onClick={cancelLogout} // Close the dialog when the overlay is clicked
        />
      )}
      {showLogoutButton && (
        <div
          className={styles.overlay_button}
          onClick={toggleLogoutButton} // Close the dialog when the overlay is clicked
        />
      )}
    </>
  );
};

export default UserCard;
