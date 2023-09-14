import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import "../Styles/Clients.scss";
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
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="component-container">
          <ClientsTable clients={clients} searchTerm="" searchColumn="companyName"/>
        </div>
      </div>
    </div>
  );
};
