import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../Context/dataContext";
import { collection, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import "firebase/firestore";
import dayjs from "dayjs";
import {
  BsFillFileEarmarkPersonFill,
  BsCalendar2Date,
  BsFileEarmarkPerson,
} from "react-icons/bs";
import { MdTaskAlt } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { TbListDetails } from "react-icons/tb";

import styles from "../../Styles/Tasks/TaskForm.module.scss";
import classNames from "classnames";

export const TaskEditForm = ({ task, onClosing }) => {
  // console.log(task);
  const taskCollectionRef = collection(db, "Tasks");
  const { technicians } = useContext(DataContext);

  const [formData, setFormData] = useState({
    company: "",
    address: "",
    title: "",
    email: "",
    description: "",
    startDate: Timestamp.fromDate(new Date()),
  });

  useEffect(() => {
    // Populate the form with the technician's data when it's available
    if (task) {
      setFormData({
        company: task.companyName,
        address: task.address,
        title: task.title,
        email: task.email,
        description: task.description,
        startDate: task.startDate,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the task's data in the database
    await onUpdate(formData);
    setShowFeedbackSuccess(true);
    setTimeout(() => {
      setShowFeedbackSuccess(false);
      onClosing();
    }, 2000);
  };

  const onUpdate = async (data) => {
    console.log(data);
    // Update the document in Firestore
    await updateDoc(doc(taskCollectionRef, task.id), data);
  };
  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   // const startDateTimeStamp = Timestamp.fromDate(new Date(startDate));

  //   const taskData = {
  //     title,
  //     address,
  //     description,
  //     //companyEmail:clients.find(company=>company.id==selectedClient).email,
  //     // technician: doc(db, "Technicians", `${selectedTechnician}`),

  //     company: clients.find((company) => company.id == selectedClient)
  //       .companyName,
  //     isArrived: false,
  //     isVerified: false,
  //     isCompleted: false,
  //     startDate: startDate,
  //     email: "ajanith101@gmail.com",
  //   };
  //   const jobsCollectionRef = collection(db, "Tasks");
  //   try {
  //     await addDoc(jobsCollectionRef, taskData);
  //     console.log("Task Edited successfully!");
  //     // You can also redirect the user or display a success message here
  //   } catch (error) {
  //     console.error("Error Editing task:", error);
  //     // Handle error, display error message, etc.
  //   }
  //   onClosing();
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.topic_container}>
          <h2 className={styles.topic}>Edit Task Details</h2>
        </div>
        <button
          className={styles.close_button}
          onClick={(e) => {
            e.preventDefault();
            onClosing();
          }}
        >
          X
        </button>
        <div className={styles.client_name}>
          <div className="icon">
            <BsFillFileEarmarkPersonFill />
          </div>
          <div>
            <label htmlFor="client">Client:</label>
            <input
              type="text"
              name="clientName"
              id=""
              value={formData.company}
            />
          </div>
        </div>
        <div className={styles.client_name}>
          <div className="icon">
            <GoLocation />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e, 1)}
              required
            />
          </div>
        </div>
        <div className={styles.client_name}>
          <div className="icon">
            <MdTaskAlt />{" "}
          </div>

          <div>
            <label htmlFor="title">Job Title:</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e, 2)}
              required
            ></input>
          </div>
        </div>

        <div className={styles.client_name}>
          <div className="icon">
            <BsFileEarmarkPerson />{" "}
          </div>

          <div>
            <label htmlFor="title">Technician:</label>
            <select
              id="client"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, 3)}
              required
            >
              <option value="">Select a Technician</option>
              {technicians.map((technician) => (
                <option key={technician.id} value={technician.email}>
                  {technician.firstName} {technician.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.client_name}>
          <div className="icon">
            <TbListDetails />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, 4)}
              required
            ></textarea>
          </div>
        </div>

        <div className={styles.client_name}>
          <div className="icon">
            <BsCalendar2Date />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              value={dayjs(formData.startDate.toDate()).format("YYYY MMMM DD")} // Extract the date from startDateTime
            />
          </div>
        </div>

        <div>
          <button type="submit">Edit Task</button>
        </div>
        <div
          className={classNames(
            styles.feedbackContainer,
            styles.feedbackWaiting,
            showFeedbackSuccess && styles.show
          )}
        >
          <MdPlaylistAddCheckCircle className={styles.feedbackIcon} />
          <p>Task was Edited!</p>
        </div>
      </form>
    </>
  );
};
