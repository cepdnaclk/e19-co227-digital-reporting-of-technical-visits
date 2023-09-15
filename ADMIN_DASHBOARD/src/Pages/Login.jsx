import React from "react";
import styles from "../Styles/Login.module.scss";
import { auth, googleProvider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/n");
    } catch (err) {
      console.log(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth?.currentUser?.displayName || "Joghn 000e");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_left}>
          <img src="./logo.jpg" alt="Logo" className={styles.logo} />
        </div>
        <form className={styles.login_right} onSubmit={signIn}>
          <h2>Welcome, Please login to your account.</h2>
          <div className={styles.google_signin_container}>
            <button className={styles.google_signin} onClick={signInWithGoogle}>
              <img
                src="src\assets\google.png"
                alt=""
                className={styles.google_logo}
              ></img>
              <p>Sign in with Google</p>
            </button>
          </div>
          <div className={styles.cred_breaker}>
            <div className={styles.line}></div>
            <span>LOGIN WITH YOUR CREDENTIALS</span>
            <div className={"line"}></div>
          </div>
          <div className={styles.input_container}>
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username or email"
              onChange={(input) => {
                setEmail(input.target.value);
              }}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(input) => {
                setPassword(input.target.value);
              }}
            />
          </div>
          <div className={styles.login_button}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
