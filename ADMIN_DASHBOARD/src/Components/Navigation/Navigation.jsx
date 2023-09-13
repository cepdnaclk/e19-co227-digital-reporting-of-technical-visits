import { useEffect } from "react";
import NavItem from "./NavItem";
import { auth } from "../../config/firebase";
import UserCard from "../UserCard";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../../Styles/Navigation/Navigation.scss";
import { FcSettings, FcOvertime,FcOrgUnit} from "react-icons/fc";
import { FaTasks, FaUsers, FaCity} from "react-icons/fa";
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
          <NavItem title="Dashboard" Icon={FcOrgUnit} />
        </li>
        <li
          className={location.pathname === "/clients" ? "active" : ""}
          onClick={() => handleItemClick("/clients")}
        >
          <NavItem title="Clients" Icon={FaCity} />
        </li>
        <li
          className={location.pathname === "/tech" ? "active" : ""}
          onClick={() => handleItemClick("/tech")}
        >
          <NavItem title="Technicians" Icon={FaUsers} />
        </li>
        <li
          className={location.pathname === "/tasks" ? "active" : ""}
          onClick={() => handleItemClick("/tasks")}
        >
          <NavItem title="Tasks" Icon={FaTasks} />
        </li>
        </ul>
        <hr className="line" />
        <ul className="item-list-2">
        <li
          className={location.pathname === "/techassign" ? "active" : ""}
          onClick={() => handleItemClick("/techassign")}
        >
          <NavItem title="Technician Assign" Icon={FcOvertime} />
        </li>
        <li
          className={location.pathname === "/settings" ? "active" : ""}
          onClick={() => handleItemClick("/settings")}
        >
          <NavItem title="Settings" Icon={FcSettings} />
        </li>
      </ul>

      <ul className="item-list">
        
      </ul>
    </div>
  );
};
