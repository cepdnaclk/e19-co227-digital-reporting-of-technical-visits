import { useEffect } from "react";
import Nav from "../NavIconTemplate/Nav";
import { auth } from "../../config/firebase";
import UserCard from "../UserCard";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Navigation.scss";
import { FaBuromobelexperte } from "react-icons/fa";
export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleItemClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    console.log(auth?.currentUser?.displayName || auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL || "No Image");
  }, []);
  return (
    <div className="navigation">
      <div className="header">
        <div className="profile">
          <img src="/logo.jpg" alt="user-img" className="profile-img" />
        </div>
      </div>

      <span></span>

      <ul className="item-list">
        <li
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => handleItemClick("/dashboard")}
        >
          <span>
            <Nav title="Dashboard" Icon={FaBuromobelexperte} />
          </span>
        </li>
        <li
          className={location.pathname === "/clients" ? "active" : ""}
          onClick={() => handleItemClick("/clients")}
        >
          Clients<span></span>
        </li>
        <li
          className={location.pathname === "/tech" ? "active" : ""}
          onClick={() => handleItemClick("/tech")}
        >
          Technicians<span></span>
        </li>
        <li
          className={location.pathname === "/tasks" ? "active" : ""}
          onClick={() => handleItemClick("/tasks")}
        >
          Tasks<span></span>
        </li>
      </ul>
      <hr />
      <div>
        <ul className="item-list">
          <li
            className={location.pathname === "/techassign" ? "active" : ""}
            onClick={() => handleItemClick("/techassign")}
          >
            Technician Assign<span></span>
          </li>
          <li
            className={location.pathname === "/settings" ? "active" : ""}
            onClick={() => handleItemClick("/settings")}
          >
            Settings<span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};
