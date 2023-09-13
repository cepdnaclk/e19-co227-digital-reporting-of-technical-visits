import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { TechniciansTable } from "../Components/Technicians/TechniciansTable";
import "../Styles/Technicians.scss"; // Import your SCSS stylesheet

export const Technician = () => {
  const [technicians, setData] = useState([]);
  const technicianCollectionRef = collection(db, "Technicians");

  useEffect(() => {
    const getTechnicians = async () => {
      const data = await getDocs(technicianCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTechnicians();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const citiesRef = collection(db, "Technicians");
      console.log(citiesRef);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="component-container">
          <div className="title">
            <p>Technician Log</p>
          </div>
          <div className="table-container">
            <input
              type="text"
              placeholder="Search Technicians..."
              className="search-input"
            />
            <button className="search-button">Search</button>
            {technicians.length > 0 ? (
              <TechniciansTable technicians={technicians} />
            ) : (
              <p>Loading technicians...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
