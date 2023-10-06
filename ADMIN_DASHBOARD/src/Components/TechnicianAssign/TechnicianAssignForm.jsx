import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/dataContext"; // Import your DataContext here
import styles from "../../Styles/TechnicianAssign/TechnicianAssignForm.module.scss";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const TechnicianAssignForm = ({ technician, timeslot, date, onClose }) => {
  // Access the jobs and technicians from the DataContext
  const { jobs, technicians } = useContext(DataContext);
  const unassignedJobs = jobs.filter((job) => !job.email);
  const jobCollectionRef = collection(db, "Tasks");

  // State to track the selected job and technician email
  const [selectedJob, setSelectedJob] = useState("");
  const [technicianEmail, setTechnicianEmail] = useState("");

  // Function to handle job selection
  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedJob) {
      console.error("Please select a job.");
      return;
    }

    if (!date || !timeslot) {
      console.error("Date and timeslot must be selected.");
      return;
    }

    // Parse the timeslot in "hh:mm A" format (e.g., "10:00 AM")
    const timeParts = timeslot.split(" ");
    if (timeParts.length !== 2) {
      console.error("Invalid timeslot format.");
      return;
    }

    const [time, ampm] = timeParts;
    const [hours, minutes] = time.split(":");
    let adjustedHours = Number(hours);

    // Adjust hours for PM times
    if (ampm === "PM" && adjustedHours !== 12) {
      adjustedHours += 12;
    }

    // Create a new Date object with the selected date and adjusted time
    const jobDate = new Date(date);
    jobDate.setHours(adjustedHours);
    jobDate.setMinutes(Number(minutes));

    // Now, you have the complete date and time for the job
    console.log(
      `Technician: ${technician.id}, Job: ${selectedJob}, Date and Time: ${jobDate.toISOString()}, Email: ${technicianEmail}`
    );
    const formData={
        
        startDate:jobDate,
        email:technicianEmail,
    }

    await onUpdate(formData,selectedJob);
    onClose();
  };

  const onUpdate = async (data,id) => {
    console.log(data);
    // Update the document in Firestore
    await updateDoc(doc(jobCollectionRef, id), data);
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    // Find the technician's email by ID
    if (technician && technician.id) {
      const matchingTechnician = technicians.find(
        (tech) => tech.id === technician.id
      );
      if (matchingTechnician) {
        setTechnicianEmail(matchingTechnician.email);
      }
    }
  }, [technician, technicians]);

  return (
    <div className={styles.card}>
      <button className={styles.close_button} onClick={(e) => handleClose(e)}>
        X
      </button>
      <h2>Assign Job for Technician</h2>
      <p>
        Technician Name: {technician ? technician.firstName : "Not selected"}
      </p>
      <p>Technician Email: {technicianEmail || "Not available"}</p>
      <p>Date: {date ? date.toISOString().split("T")[0] : "Not Selected"}</p>

      <p>Timeslot: {timeslot ? timeslot : "Not selected"}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Select Job:
          <select value={selectedJob} onChange={handleJobChange}>
            <option value="">Select a Job</option>
            {unassignedJobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Job</button>
      </form>
    </div>
  );
};

export default TechnicianAssignForm;
