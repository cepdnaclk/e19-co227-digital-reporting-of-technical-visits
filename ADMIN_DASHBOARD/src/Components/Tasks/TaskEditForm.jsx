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
import dayjs from "dayjs";
import {
  BsFillFileEarmarkPersonFill,
  BsCalendar2Date,
} from "react-icons/bs";
import { MdTaskAlt } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { TbListDetails } from "react-icons/tb";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import styles from "../../Styles/Tasks/TaskForm.module.scss";

export const TaskEditForm = ({ task, onClosing }) => {
  console.log(task);
  const [address, setAddress] = useState(task.address);
  const [description, setDescription] = useState(task.description);
  const [title, setTitle] = useState(task.title);
  const [technicians, setTechnicians] = useState();
  const [client, setClient] = useState(task.companyName);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);
  const [startDate, setStartDate] = useState(task.startDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const startDateTimeStamp = Timestamp.fromDate(new Date(startDate));

    const taskData = {
      title,
      address,
      description,
      //companyEmail:clients.find(company=>company.id==selectedClient).email,
      // technician: doc(db, "Technicians", `${selectedTechnician}`),

      company: clients.find((company) => company.id == selectedClient)
        .companyName,
      isArrived: false,
      isVerified: false,
      isCompleted: false,
      startDate: startDate,
      email: "ajanith101@gmail.com",
    };
    const jobsCollectionRef = collection(db, "Tasks");
    try {
      await addDoc(jobsCollectionRef, taskData);
      console.log("Task Edited successfully!");
      // You can also redirect the user or display a success message here
    } catch (error) {
      console.error("Error Editing task:", error);
      // Handle error, display error message, etc.
    }
    onClosing();
  };

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
            <input type="text" name="clientName" id="" value={client} />
          </div>
        </div>
        <div className={styles.client_name}>
          <div className="icon">
            <GoLocation />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              disabled={sameAsCompanyAddress}
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        {/* <div>
          <button
            onClick={(e) => {
              e.preventDefault();

              setSameAsCompanyAddress(false);
            }}
          >
            X
          </button>
        </div> */}
        <div className={styles.client_name}>
          <div className="icon">
            <MdTaskAlt />{" "}
          </div>

          <div>
            <label htmlFor="title">Job Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={dayjs(startDate.toDate()).format("YYYY MMMM DD")} // Extract the date from startDateTime
            />
          </div>
        </div>

        <div></div>
        <button type="submit">Edit Task</button>
      </form>
    </>
  );
};
