import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import styles from "../Styles/Clients.module.scss";
import { db } from "../config/firebase";
import React, { useState, useEffect, useContext } from "react";
import { ClientsTable } from "../Components/Clients/ClientsTable";
import { ClientForm } from "../Components/Clients/ClientForm";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { DataContext } from "../Context/dataContext";
import { ClientEditForm } from "../Components/Clients/ClientEditForm";
import Notification from "../Components/Notification";

export const Clients = () => {
  // const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("Client Name");

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const { clients } = useContext(DataContext);

  // useEffect(() => {
  //   const clientCollectionRef = collection(db, "Clients");

  //   const unsubscribe = onSnapshot(clientCollectionRef, (snapshot) => {
  //     const updatedClients = [];
  //     snapshot.forEach((doc) => {
  //       updatedClients.push({ ...doc.data(), id: doc.id });
  //     });
  //     setClients(updatedClients);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedTask(null);
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <UserCard />
      <Notification />
      <div className={styles.component_container}>
        <div className={styles.title}>
          <p>Clients Log</p>
        </div>
        <div className={styles.button_container}>
          {!showForm && (
            <button
              className={styles.add_technician_button}
              onClick={() => setShowForm(true)}
            >
              Add New Client
            </button>
          )}
        </div>

        {showForm && <ClientForm />}
        {showEditForm && (
          <div className={styles.cardcontainer}>
            <ClientEditForm client={selectedClient} onClosing={closeEditForm} />
          </div>
        )}
        <div className={styles.table_container}>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder="&#128270; &ensp;Search by name..."
              className={styles.search_input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className={styles.label}>Sort by:</p>
            <select
              className={styles.search_column_select}
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <option value="Company Name">Company Name</option>
              <option value="Email">Email</option>
              <option value="Address">Address</option>
            </select>
          </div>
          <ClientsTable
            clients={clients}
            searchTerm={searchTerm}
            searchColumn={searchColumn}
            clientEdit={(client) => {
              setShowEditForm(true);
              setSelectedClient(client);
            }}
          />
        </div>
      </div>
    </div>
  );
};
