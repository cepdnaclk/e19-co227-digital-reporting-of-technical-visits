import React, { useState, useEffect, useRef, useContext } from "react";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { TasksTable } from "../Components/Tasks/TasksTable";
import { TaskForm } from "../Components/Tasks/TaskForm";
import styles from "../Styles/Tasks.module.scss";
import { TaskEditForm } from "../Components/Tasks/TaskEditForm";
import { TaskVerifyForm } from "../Components/Tasks/TaskVerifyForm";
import { DataContext } from "../Context/dataContext";
import Notification from "../Components/Notification";

export const Tasks = () => {
  // const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("Task Name");

  const [showForm, setShowForm] = useState(false);
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const { jobs } = useContext(DataContext);
  const backgroundClick = useRef(null);
  const backgroundClickEdit = useRef(null);
  const backgroundClickVerify = useRef(null);
  // useEffect(() => {
  //   const jobsCollectionRef = collection(db, "Tasks");

  //   const unsubscribe = onSnapshot(jobsCollectionRef, async (snapshot) => {
  //     const updatedJobs = [];

  //     for (const docRef of snapshot.docs) {
  //       const jobData = docRef.data();
  //       var jobWithTechnician = jobData;
  //       if (jobData.email && jobData.technicianRef) {
  //         const technicianRef = jobData.technicianRef;
  //         console.log(jobData);

  //         const technicianDoc = await getDoc(technicianRef);

  //         if (technicianDoc.exists()) {
  //           const technicianName =
  //             technicianDoc.data().firstName +
  //             " " +
  //             technicianDoc.data().lastName;
  //           jobWithTechnician = {
  //             ...jobWithTechnician,
  //             technicianName,
  //           };
  //           console.log(technicianName);
  //         }
  //       }

  //       if (jobData.companyRef) {
  //         const companyRef = jobData.companyRef;
  //         const companyDoc = await getDoc(companyRef);
  //         const companyName = companyDoc.data().companyName;
  //         const companyAddress = companyDoc.data().address;

  //         jobWithTechnician = {
  //           ...jobWithTechnician,
  //           companyName,
  //           companyAddress,
  //         };

  //         updatedJobs.push(jobWithTechnician);
  //       }
  //     }

  //     setJobs(updatedJobs);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);

    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickVerify);

    return () => {
      document.removeEventListener("click", handleBackgroundClickVerify);
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
      closeEditForm();
    }
  };

  const handleBackgroundClickVerify = (e) => {
    if (e.target === backgroundClickVerify.current) {
      closeVerifyForm();
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedTask(null);
  };

  const closeVerifyForm = () => {
    setShowVerifyForm(false);
    setSelectedTask(null);
  };

  return (
    <div>
      {showEditForm && (
        <div className={styles.cardContainer} ref={backgroundClickEdit}>
          <TaskEditForm task={selectedTask} onClosing={closeEditForm} />
        </div>
      )}

      {showForm && (
        <div className={styles.cardContainer} ref={backgroundClick}>
          <TaskForm onClosing={toggleForm} />
        </div>
      )}

      {showVerifyForm && (
        <div className={styles.cardContainer} ref={backgroundClickVerify}>
          <TaskVerifyForm task={selectedTask} onClosing={closeVerifyForm} />
        </div>
      )}
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <Notification />
        <div className={styles.component_container}>
          <div className={styles.name}>
            <p>Tasks Log</p>
          </div>
          <div className={styles.button_container}>
            <button className={styles.create_task_button} onClick={toggleForm}>
              Create Task
            </button>
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
            {jobs.length > 0 ? (
              <TasksTable
                tasks={jobs}
                searchTerm={searchTerm}
                searchColumn={searchColumn}
                taskEdit={(task) => {
                  setShowEditForm(true);
                  setSelectedTask(task);
                }}
                taskVerify={(task) => {
                  setShowVerifyForm(true);
                  setSelectedTask(task);
                }}
              />
            ) : (
              <p className={styles.loading}>Loading Tasks.....</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
