import React, { useState, useEffect, useContext } from "react";
import ImageCarousel from "./Carousel";
import { DataContext } from "../../Context/dataContext";
import { collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import classNames from "classnames";
import { MdError, MdPlaylistAddCheckCircle } from "react-icons/md";
import {
  BsFillFileEarmarkPersonFill,
  BsFileEarmarkPerson,
  BsCalendar2Date,
  BsClock,
} from "react-icons/bs";
import { MdTaskAlt } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { GrNotes } from "react-icons/gr";
import { TbListDetails } from "react-icons/tb";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import styles from "../../Styles/Tasks/TaskVerifyForm.module.scss";

export const TaskVerifyForm = ({ task, onClosing }) => {
  console.log(task);
  const taskCollectionRef = collection(db, "Tasks");
  const [address, setAddress] = useState(task.address);
  const [client, setClient] = useState(task.companyName);
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);
  const [startDate, setStartDate] = useState(task.inspectionDate);
  const [inspectionTime, setInspectionTime] = useState(task.inspectionTime);
  const { technicians } = useContext(DataContext);

  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    description: "",
    workType: "",
    isVerified: true,
  });

  useEffect(() => {
    // Populate the form with the technician's data when it's available
    if (task) {
      setFormData({
        title: task.title,
        notes: task.notes,
        description: task.description,
        workType: task.workType,
        isVerified: true,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
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
  //     console.log("Task created successfully!");
  //     // You can also redirect the user or display a success message here
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //     // Handle error, display error message, etc.
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.topic_container}>
          <h2 className={styles.topic}>Verify Task Details</h2>
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

        <div className={styles.column_container}>
          <div className={styles.column1}>
            <div className={styles.outer_field_container}>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <BsFillFileEarmarkPersonFill />
                </div>
                <div>
                  <label htmlFor="client">Company:</label>
                  <input type="text" name="clientName" id="" value={client} />
                </div>
              </div>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <GoLocation />
                </div>
                <div>
                  <label htmlFor="address">Company Address:</label>
                  <input
                    disabled={sameAsCompanyAddress}
                    type="text"
                    id="address"
                    value={address}
                  />
                </div>
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
            <div className={styles.outer_field_container}>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <MdTaskAlt />{" "}
                </div>
                <div>
                  <label htmlFor="title">Title of the Task:</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e, 0)}
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <BsFileEarmarkPerson />{" "}
                </div>
                <div>
                  <label htmlFor="title">Technician Name:</label>
                  <input
                    type="text"
                    id="title"
                    value={
                      (technicians.find(
                        (technician) => technician.email === task.email
                      )?.firstName || "No Technician") +
                      " " +
                      (technicians.find(
                        (technician) => technician.email === task.email
                      )?.lastName || "")
                    }
                  ></input>
                </div>
              </div>
            </div>

            <div className={styles.outer_field_container}>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <BsCalendar2Date />
                </div>
                <div>
                  <label htmlFor="date">Inspection Date:</label>
                  <input
                    type="text"
                    id="date"
                    value={dayjs(new Date(startDate)).format("YYYY MMMM DD")} // Extract the date from startDateTime
                  />
                </div>
              </div>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <BsClock />
                </div>
                <div>
                  <label htmlFor="date">Inspection Time:</label>
                  <input
                    type="text"
                    id="date"
                    value={inspectionTime} // Extract the date from startDateTime
                  />
                </div>
              </div>
            </div>

            <div className={styles.outer_field_container}>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <TbListDetails />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <GrNotes />
                </div>
                <div>
                  <label htmlFor="description">Notes:</label>
                  <textarea
                    id="description"
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={styles.outer_field_container}>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <BsCalendar2Date />
                </div>
                <div>
                  <label htmlFor="date">Site Representative:</label>
                  <input
                    type="text"
                    id="representative"
                    value={task.siteRepresentative} // Extract the date from startDateTime
                  />
                </div>
              </div>
              <div className={styles.client_name}>
                <div className={styles.icon}>
                  <p>Signature:</p>
                </div>
                <div>
                  <label htmlFor="date"></label>
                  <img
                    type="signature"
                    id="date"
                    className={styles.signature}
                    src={task.signatureUrl} // Use the signatureUrl property of the task object
                  />
                </div>
              </div>
            </div>
          </div>
          {task.imageUrls ? (
            <div className={styles.image_container}>
              <ImageCarousel imageUrls={task.imageUrls} />
              <a
                href={task.technicianReportUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Technician Report
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div>
          <button type="submit">Verify Task</button>
        </div>
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
    </>
  );
};
