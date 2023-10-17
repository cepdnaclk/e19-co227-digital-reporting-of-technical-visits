import React, { useState, useEffect, useRef, useContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { TechniciansTable } from "../Components/Technicians/TechniciansTable";
import { TechnicianForm } from "../Components/Technicians/TechnicianForm";
import { TechnicianEditForm } from "../Components/Technicians/TechnicianEditForm";
import styles from "../Styles/Technicians.module.scss";
import { DataContext } from "../Context/dataContext";
import Notification from "../Components/Notification";

export const Technician = () => {
  // const [technicians, setTechnicians] = useState([]);
  const {technicians} = useContext(DataContext);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  /* 
useRef is used to create a reference to a DOM element or to persist values
across renders without causing re-renders when the value changes.
It's often used for accessing and manipulating DOM elements directly,
or for storing mutable values that don't trigger component re-renders. 

*delete this after read 😁
*/

  const backgroundClick = useRef(null);
  const backgroundClickEdit = useRef(null);

  const [searchColumn, setSearchColumn] = useState("Name");

  // useEffect(() => {
  //   const technicianCollectionRef = collection(db, "Technicians");

  //   const unsubscribe = onSnapshot(technicianCollectionRef, (snapshot) => {
  //     const updatedTechnicians = [];
  //     snapshot.forEach((doc) => {
  //       updatedTechnicians.push({ ...doc.data(), id: doc.id });
  //     });
  //     setTechnicians(updatedTechnicians);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);


  /*
 😶‍🌫️
This effect attaches a click event listener to close the form when clicking outside of it.
   - addEventLisiner => Attach the click event listener when the component mounts.
   - removeEventListener => Clean up by removing the event listener when the component unmounts.
*/
  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);

    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickEdit);

    return () => {
      document.removeEventListener("click", handleBackgroundClickEdit);
    };
  }, []);

  // Function to close the form when clicking outside of it.
  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowForm(false);
    }
  };

  // Function to close the edit form when clicking outside of it.
  const handleBackgroundClickEdit = (e) => {
    if (e.target === backgroundClickEdit.current) {
      setShowEditForm(false);
    }
  };

  // Function to close the techniciaAdd form
  const closeForm = () => {
    setShowForm(false);
  };

  // Function to close the edit form
  const closeEditForm = () => {
    setSelectedTechnician(null);
    setShowEditForm(false);
  };

  return (
    <div>
      {/* Display the technician add form as a modal/popup when needed */}
      {showForm && (
        <div className={styles.cardContainer} ref={backgroundClick}>
          <TechnicianForm onClosing={closeForm} />
        </div>
      )}

      {/* Display the edit form as a modal/popup when needed */}
      {showEditForm && (
        <div className={styles.cardContainer} ref={backgroundClickEdit}>
          <TechnicianEditForm
            technician={selectedTechnician}
            onClosing={closeEditForm}
          />
        </div>
      )}
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <Notification/>

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

          <div className={styles.table_container}>
            <div className={styles.search_bar}>
              <input
                type="text"
                placeholder="&#128270; &ensp;Search Technicians... "
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
                technicianEdit={(selectedTech) => {
                  setSelectedTechnician(selectedTech);
                  setShowEditForm(true);
                }}
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
