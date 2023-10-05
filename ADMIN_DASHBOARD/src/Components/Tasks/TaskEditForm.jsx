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
  BsFileEarmarkPerson,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FiMapPin, FiCheck, FiCheckCircle } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import styles from "../../Styles/Tasks/TasksForm.module.scss";

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
  const [startDate, setStartDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTimeStamp = Timestamp.fromDate(new Date(startDate));

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
      startDate: startDateTimeStamp,
      email: "ajanith101@gmail.com",
    };
    const jobsCollectionRef = collection(db, "Tasks");
    try {
      await addDoc(jobsCollectionRef, taskData);
      console.log("Task created successfully!");
      // You can also redirect the user or display a success message here
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error, display error message, etc.
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
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
        <div>
          <label htmlFor="client">Client:</label>

          <input type="text" name="" id="" value={client} />
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
            value={startDate.split("T")[0]} // Extract the date from startDateTime
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div></div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};
