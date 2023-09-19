import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import styles from "../Styles/Clients.module.scss";
import { db } from "../config/firebase";
import { useState,useEffect } from "react";
import { ClientsTable } from "../Components/Clients/ClientsTable";
import { collection,onSnapshot } from "firebase/firestore";

export const Clients = () => {
  const [clients,setClients] = useState([]);

  useEffect(() => {
    const clientCollectionRef = collection(db, "Clients");

    const unsubscribe = onSnapshot(clientCollectionRef, (snapshot) => {
      const updatedClients = [];
      snapshot.forEach((doc) => {
        updatedClients.push({ ...doc.data(), id: doc.id });
      });
      setClients(updatedClients);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <div className={styles.component_container}>
        <div className={styles.title}>
            <p>Clients Log</p>
          </div>
          <ClientsTable clients={clients} searchTerm="" searchColumn="companyName"/>
        </div>
      </div>
    </div>
  );
};