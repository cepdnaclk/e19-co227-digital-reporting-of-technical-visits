import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/dataContext"; // Import your DataContext here
import styles from "../../Styles/TechnicianAssign/TechnicianAssignForm.module.scss";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  BsFillFileEarmarkPersonFill,
  BsCalendar2Date,
  BsClock,
} from "react-icons/bs";
import { MdError, MdPlaylistAddCheckCircle } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import classNames from "classnames";

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

  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
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
      `Technician: ${
        technician.id
      }, Job: ${selectedJob}, Date and Time: ${jobDate.toISOString()}, Email: ${technicianEmail}`
    );
    const formData = {
      startDate: jobDate,
      email: technicianEmail,
    };

    await onUpdate(formData, selectedJob);
    onClose();
  };

  const onUpdate = async (data, id) => {
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
    <form onSubmit={handleSubmit} className={styles.card}>
      <button className={styles.close_button} onClick={(e) => handleClose(e)}>
        X
      </button>
      <div className={styles.topic_container}>
        <h2 className={styles.topic}>Assign Job for Technician</h2>
      </div>
      <div className={styles.client_name}>
        <div className={styles.icon}>
          <BsFillFileEarmarkPersonFill />
        </div>
        <div>
          <label>Technician Name: </label>
          <input type="text" value={technician
              ? technician.firstName + " " + technician.lastName
              : "Not selected"}
          />
        </div>
      </div>
      <div className={styles.e_mail}>
        <div className={styles.icon}>
          <AiOutlineMail />
        </div>
        <div>
          <label>Technician Email:</label>
          <input type="email" value={technicianEmail || "Not available"}/>
        </div>
      </div>
      <div className={styles.date}>
        <div className={styles.icon}>
          <BsCalendar2Date />
        </div>
        <div>
          <label>Date:</label>{" "}
          <input type="date" value={date ? date.toISOString().split("T")[0] : "Not Selected"}/>
        </div>
      </div>
      <div className={styles.e_mail}>
        <div className={styles.icon}>
          <BsClock />
        </div>
        <div>
          <label>Timeslot:</label> 
          <input type="times" value={timeslot ? timeslot : "Not selected"}></input>
        </div>
      </div>

      <div className={styles.client_name}>
        <div className={styles.icon}>
          <TbListDetails />
        </div>
        <div> <label>Select Job:</label>
        <select value={selectedJob} onChange={handleJobChange}>
          <option value="">Select a Job</option>
          {unassignedJobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select></div>
       
      </div>

      <button type="submit">Assign Job</button>
      <div
          className={classNames(
            styles.feedbackContainer,
            styles.feedbackWaiting,
            showFeedbackSuccess && styles.show
          )}
        >
          <MdPlaylistAddCheckCircle className={styles.feedbackIcon} />
          <p>Task Verified!</p>
        </div>

    </form>
  );
};

export default TechnicianAssignForm;
