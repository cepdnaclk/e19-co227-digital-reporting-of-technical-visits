import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import styles from "../Styles/Clients.module.scss";
import { db } from "../config/firebase";
import { useState, useEffect,useContext} from "react";
import { ClientsTable } from "../Components/Clients/ClientsTable";
import { ClientForm } from "../Components/Clients/ClientForm";
import { collection, onSnapshot } from "firebase/firestore";
import { DataContext } from "../Context/dataContext";

export const Clients = () => {
  // const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const {clients} = useContext(DataContext);
  

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
  return (
      <div className={styles.container}>
        <Navigation />
        <UserCard />
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

          {showForm && (
            <ClientForm
              onClosing={() => {
                setShowForm(false);
              }}
            />
          )}
          <ClientsTable
            clients={clients}
            searchTerm=""
            searchColumn="companyName"
          />
        </div>
      </div>
  );
};
