import { useEffect } from "react";
import Nav from "../NaviconTemplate/Nav";
import { auth } from "../../config/firebase";
import "./Navigation.css";

export const Navigation = () => {
  useEffect(() => {
    console.log(auth?.currentUser?.displayName ||auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL || "No Image");
  }, []);
  return (
    <div className="navigation">
      <header>
        <div className="profile">
          <img src="/logo.jpg" alt="user-img" className="profile-img" />
        </div>
        <span></span>
      </header>
      <Nav />
    </div>
  );
};


