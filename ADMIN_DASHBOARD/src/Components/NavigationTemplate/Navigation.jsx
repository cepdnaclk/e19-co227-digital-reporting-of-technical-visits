import { useEffect } from "react";
import Nav from "../NaviconTemplate/Nav";
import { auth } from "../../config/firebase";

import { useNavigate } from "react-router-dom";

import "./Navigation.scss";


export const Navigation = () => {
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
      <header>
        <div className="profile">
          <img src="/logo.jpg" alt="user-img" className="profile-img" />
        </div>
        
        <span></span>
      </header>
      <ul >
          <li
            
            onClick={() => handleItemClick("/dashboard")}
          >
            Dashboard<span></span>
          </li>
          <li
            
            onClick={() => handleItemClick("/clients")}
          >
            Clients<span></span>
          </li>
          <li
            
            onClick={() => handleItemClick("/tech")}
          >
            Technicians<span></span>
          </li>
          <li
            
            onClick={() => handleItemClick("/tasks")}
          >
            Tasks<span></span>
          </li>
          <li
            
            onClick={() => handleItemClick("/techassign")}
          >
           Technician Assign<span></span>
          </li>
        </ul>
      <Nav />
    </div>
  );
};
