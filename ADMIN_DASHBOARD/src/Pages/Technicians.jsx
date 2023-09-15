import React, { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { TechniciansTable } from "../Components/Technicians/TechniciansTable";
import { TechnicianForm } from "../Components/Technicians/TechnicianForm";
import styles from "../Styles/Technicians.module.scss";

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
      <div className={styles.container}>
        <Navigation />
        <UserCard />

        <div className={styles.component_container}>
          <div className={styles.title}>
            <p>Technician Log</p>
          </div>
          <div className={styles.button_container}>
            {!showForm && (
              <button
                className={styles.add_technician_button}
                onClick={() => setShowForm(true)}
              >
                Add New Technician
              </button>
            )}
          </div>

            {showForm && <TechnicianForm onClosing={closeForm} />}
          <div className={styles.table_container}>
            <div className={styles.search_bar}>
              <input
                type="text"
                placeholder="Search Technicians..."
                className={styles.search_input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <p className={styles.lable}>Sort by:</p>
              <select
                className={styles.search_column_select}
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
