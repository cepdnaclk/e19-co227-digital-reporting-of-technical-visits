import React, { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { TechniciansTable } from "../Components/Technicians/TechniciansTable";
import { TechnicianForm } from "../Components/Technicians/TechnicianForm";
import "../Styles/Technicians.scss";

export const Technician = () => {
  const [technicians, setTechnicians] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const [searchColumn, setSearchColumn] = useState("Name");


  useEffect(() => {
    const technicianCollectionRef = collection(db, "Technicians");

    const unsubscribe = onSnapshot(technicianCollectionRef, (snapshot) => {
      const updatedTechnicians = [];
      snapshot.forEach((doc) => {
        updatedTechnicians.push({ ...doc.data(), id: doc.id });
      });
      setTechnicians(updatedTechnicians);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createTechnician = async () => {};

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />

        <div className="component-container">
          <div className="title">
            <p>Technician Log</p>
          </div>
          <div>
            {!showForm && (
              <button
                className="add-technician-button"
                onClick={() => setShowForm(true)}
              >
                Add New Technician
              </button>
            )}

            {showForm && <TechnicianForm onClosing={closeForm} />}
          </div>
          <div className="table-container">

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Technicians..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="search-column-select"
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
              >
                <option value="Name">Name</option>
                <option value="Email">Email Address</option>
                <option value="Address">Address</option>
                <option value="TP">Telephone</option>
              </select>
            </div>


            {technicians.length > 0 ? (
              <TechniciansTable
                technicians={technicians}
                searchTerm={searchTerm}

                searchColumn={searchColumn}

              />
            ) : (
              <p>Loading technicians...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
