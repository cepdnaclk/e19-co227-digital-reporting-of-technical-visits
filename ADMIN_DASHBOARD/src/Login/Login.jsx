import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img src="./logo.jpg" alt="Logo" className="logo" />
        </div>
        <div className="login-right">
          <h2>Welcome, Please login to your account.</h2>
          <div className="google-signin">
            <img src="src\assets\google.png" alt="" className="google-logo"></img>
            <p>Sign in with Google</p>
          </div>
          <span>LOGIN WITH YOUR CREDENTIALS</span>
          <div className="input-container">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username or email"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="login-button">
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
