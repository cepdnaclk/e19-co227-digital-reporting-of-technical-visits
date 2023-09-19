import React, { useState, useEffect } from "react";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { TasksTable } from "../Components/Tasks/TasksTable";
import { TaskForm } from "../Components/Tasks/TaskForm";
import styles from "../Styles/Tasks.module.scss";

export const Tasks = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("Task Name");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const jobsCollectionRef = collection(db, "Tasks");

    const unsubscribe = onSnapshot(jobsCollectionRef, async (snapshot) => {
      const updatedJobs = [];

      for (const docRef of snapshot.docs) {
        const jobData = docRef.data();
        var jobWithTechnician = jobData;
        if (jobData.email && jobData.technicianRef) {
          
          const technicianRef = jobData.technicianRef;
          console.log(jobData);
          

          const technicianDoc = await getDoc(technicianRef);
          
          if (technicianDoc.exists()) {
            const technicianName =
              technicianDoc.data().firstName +
              " " +
              technicianDoc.data().lastName;
            jobWithTechnician = {
              ...jobWithTechnician,
              technicianName,
            };
            console.log(technicianName)
          }
        }

        

        if (jobData.companyRef) {
          const companyRef = jobData.companyRef;
        const companyDoc = await getDoc(companyRef);
          const companyName = companyDoc.data().companyName;
          const companyAddress = companyDoc.data().address;

          jobWithTechnician = {
            ...jobWithTechnician,
            companyName,
            companyAddress,
          };

          updatedJobs.push(jobWithTechnician);
        }
      }

      setJobs(updatedJobs);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <div className={styles.component_container}>
          <div className={styles.name}>
            <p>Tasks Log</p>
          </div>
          <div className={styles.button_container}>
            <button className={styles.create_task_button} onClick={toggleForm}>
              Create Task
            </button>
          </div>
          {showForm && <TaskForm />}
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
                <option value="Task Name">Task Name</option>
                <option value="Company">Company</option>
                <option value="Address">Address</option>
              </select>
            </div>
            <TasksTable
              tasks={jobs}
              searchTerm={searchTerm}
              searchColumn={searchColumn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
