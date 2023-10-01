import React, { useEffect } from "react";
import NavItem from "./NavItem";
import { auth } from "../../config/firebase";
import UserCard from "../UserCard";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "../../Styles/Navigation/Navigation.module.scss";
import { FcSettings, FcOvertime, FcOrgUnit } from "react-icons/fc";
import { FaTasks, FaUsers, FaCity } from "react-icons/fa";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!auth.currentUser) {
  //     navigate("/");
  //   }
  // }, []);

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img
            onClick={() => handleItemClick("/dashboard")}
            src="/logo.jpg"
            alt="user-img"
            className={styles.profile_img}
          />
        </div>
      </div>

      <span></span>

      <ul className={styles.item_list}>
        <li
          className={location.pathname === "/dashboard" ? styles.active : ""}
          onClick={() => handleItemClick("/dashboard")}
        >
          <NavItem title="Dashboard" Icon={FcOrgUnit} />
        </li>
        <li
          className={location.pathname === "/clients" ? styles.active : ""}
          onClick={() => handleItemClick("/clients")}
        >
          <NavItem title="Clients" Icon={FaCity} />
        </li>
        <li
          className={location.pathname === "/tech" ? styles.active : ""}
          onClick={() => handleItemClick("/tech")}
        >
          <NavItem title="Technicians" Icon={FaUsers} />
        </li>
        <li
          className={location.pathname === "/tasks" ? styles.active : ""}
          onClick={() => handleItemClick("/tasks")}
        >
          <NavItem title="Tasks" Icon={FaTasks} />
        </li>
      </ul>
      <hr className={styles.line} />
      <ul className={styles.item_list_2}>
        <li
          className={location.pathname === "/techassign" ? styles.active : ""}
          onClick={() => handleItemClick("/techassign")}
        >
          <NavItem title="Technician Assign" Icon={FcOvertime} />
        </li>
        <li
          className={location.pathname === "/settings" ? styles.active : ""}
          onClick={() => handleItemClick("/settings")}
        >
          <NavItem title="Settings" Icon={FcSettings} />
        </li>
      </ul>

      <ul className={styles.item_list}></ul>
    </div>
  );
};
