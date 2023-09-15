import React, { useEffect, useState } from "react";
import styles from "../Styles/UserCard.module.scss";
import { auth } from "../config/firebase";
// import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";

const UserCard = () => {
  const [user, setUser] = useState(null);

  // const clientID =
  //   "296031466051-f33qjbgaft3pbim0l039def1kssgppd0.apps.googleusercontent.com";

  // const onSuccess = (response) => {
  //   handleLogin(response);
  // };

  // const onFailure = (error) => {
  //   handleFailure(error);
  // };

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
    <div className={styles.user_card}>
      {user ? (
        <div className={styles.user_info}>
          <img src={user.photoURL} alt="User" />
          <div className={styles.user_details}>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
            
          </div>
        </div>

        // <GoogleOAuthProvider clientId={clientID}>
        //   <GoogleLogin
        //         onSuccess={onSuccess}
        //         // shape="pill"
        //         // theme="outline"
        //         // type="icon"
        //         // text="sign in with"
        //         theme="outlined" // or  "outline"
        //         text="signin_with"
        //         shape="circle"
        //         onFailure={onFailure}
        //       />
        // </GoogleOAuthProvider>
      ) : (
        <p>Guest User</p>
      )}
    </div>
  );
};

export default UserCard;
