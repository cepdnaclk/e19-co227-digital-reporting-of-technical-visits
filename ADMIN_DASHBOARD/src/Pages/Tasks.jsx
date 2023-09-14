import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import { collection,onSnapshot,getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState,useEffect } from "react";
import "../Styles/Tasks.scss";
import { TasksTable } from "../Components/Tasks/TasksTable";

export const Tasks = () => {

  const [jobs, setJobs] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchColumn,setSearchColumn] = useState("Task Name");

  useEffect(() => {
    // Create a reference to the "Jobs" collection in Firestore
    const jobsCollectionRef = collection(db, "Jobs");

    // Set up a Firestore listener for real-time updates (or use getDocs for one-time fetch)
    const unsubscribe = onSnapshot(jobsCollectionRef, async (snapshot) => {
      const updatedJobs = [];

      // Iterate over the jobs
      for (const docRef of snapshot.docs) {
        const jobData = docRef.data();
        console.log(jobData)
        const technicianRef = jobData.technician; // Assuming "technician" is the reference field

        // Fetch the associated technician document
        const technicianDoc = await getDoc(technicianRef);

        if (technicianDoc.exists()) {
          console.log(technicianDoc.data());
          // Extract the technician's name
          const technicianName = technicianDoc.data().firstName +" " + technicianDoc.data().lastName;

          // Combine job data with technician name
          const jobWithTechnician = {
            ...jobData,
            technicianName,
          };

          updatedJobs.push(jobWithTechnician);
        }
      }

      setJobs(updatedJobs);
      console.log(jobs)
    });

    // Clean up the listener when the component unmounts
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
          <div className="name">
            <p>Tasks Log</p>
          </div>
          <div>
          <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

<select
                className="search-column-select"
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
              >
                <option value="Task Name">Task Name</option>
                <option value="Company">Company</option>
                <option value="Address">Address</option>
                <option value="Technician Name">Technician Name</option>
              </select>
            <TasksTable tasks={jobs} searchTerm={searchTerm}  searchColumn={searchColumn}/>
          </div>
        </div>
      </div>
    </div>
  );
};
