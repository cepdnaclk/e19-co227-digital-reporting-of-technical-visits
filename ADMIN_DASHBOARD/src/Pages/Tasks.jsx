import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import styles from "../Styles/Tasks.module.scss";
import { TasksTable } from "../Components/Tasks/TasksTable";
import { TaskForm } from "../Components/Tasks/TaskForm";

export const Tasks = () => {
  const [jobs, setJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("Task Name");

  useEffect(() => {
    // Create a reference to the "Jobs" collection in Firestore
    const jobsCollectionRef = collection(db, "Jobs");

    // Set up a Firestore listener for real-time updates (or use getDocs for one-time fetch)
    const unsubscribe = onSnapshot(jobsCollectionRef, async (snapshot) => {
      const updatedJobs = [];

      // Iterate over the jobs
      for (const docRef of snapshot.docs) {
        const jobData = docRef.data();
        var jobWithTechnician = jobData;
        if (jobData.technician) {
          const technicianRef = jobData.technician;

          const technicianDoc = await getDoc(technicianRef);
          if (technicianDoc.exists()) {
            // Extract the technician's name
            const technicianName =
              technicianDoc.data().firstName +
              " " +
              technicianDoc.data().lastName;
            // Combine job data with technician name
            jobWithTechnician = {
              ...jobWithTechnician,
              technicianName,
            };
          }
        }

        const companyRef = jobData.company;
        const companyDoc = await getDoc(companyRef);

        if (companyDoc.exists()) {
          const companyName = companyDoc.data().companyName;
          const companyAddress = companyDoc.data().address;

          // Combine job data with technician name
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

    // Clean up the listener when the component unmounts
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
          <TaskForm />
          <div className={styles.name}>
            <p>Tasks Log</p>
          </div>
          <div className={styles.table_container}>
            <div className={styles.search_bar}>
              <input
                type="text"
                placeholder="&#128270; &ensp;Search by name..."
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
