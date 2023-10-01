import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers";
import styles from "../../Styles/Tasks/TaskForm.module.scss";
import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

export const TaskForm = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [showForm, setShowForm] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTimeStamp = Timestamp.fromDate(new Date(startDate));

    const taskData = {
      title,
      address,
      description,
      companyEmail: clients.find((company) => company.id == selectedClient).email,
      companyRef: doc(db, "Clients", `${selectedClient}`),
      company: clients.find((company) => company.id == selectedClient).companyName,
      isArrived: false,
      isVerified: false,
      isCompleted: false,
      startDate: startDateTimeStamp,
      email: "ajanith101@gmail.com",
    };
    const jobsCollectionRef = collection(db, "Tasks");
    try {
      await addDoc(jobsCollectionRef, taskData);
      console.log("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <div className={styles.card}>
          <div className={styles.close_button} onClick={handleClose}>
            X
          </div>
          <h2 className={styles.topic}>Create Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="client">Client:</label>
              <select
                id="client"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                required
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="address">Task Address</label>
              <input
                disabled={sameAsCompanyAddress}
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                disabled={sameAsCompanyAddress}
                onClick={(e) => {
                  e.preventDefault();
                  const theClient = clients.find((obj) => obj.id === selectedClient);
                  setAddress(theClient.address);
                  setSameAsCompanyAddress(true);
                }}
              >
                Same As Company Address
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSameAsCompanyAddress(false);
                }}
              >
                X
              </button>
            </div>
            <div>
              <label htmlFor="title">Job Title:</label>
              <textarea
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={startDate.split("T")[0]}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create Task</button>
          </form>
        </div>
      )}
    </>
  );
};