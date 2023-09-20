import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, doc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

export const TaskForm = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [title,setTitle] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);
  const [startDate, setStartDate] = useState("");


  // useEffect(() => {
  //   const technicianCollectionRef = collection(db, "Technicians");

  //   const unsubscribe = onSnapshot(technicianCollectionRef, (snapshot) => {
  //     const updatedTechnicians = [];
  //     snapshot.forEach((doc) => {
  //       updatedTechnicians.push({ ...doc.data(), id: doc.id });
  //     });
  //     setTechnicians(updatedTechnicians);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  useEffect(() => {
    const clientCollectionRef = collection(db, "Clients");

    const unsubscribe = onSnapshot(clientCollectionRef, (snapshot) => {
      const updatedClients = [];
      snapshot.forEach((doc) => {
        updatedClients.push({ ...doc.data(), id: doc.id });
      });
      setClients(updatedClients);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTimeStamp = Timestamp.fromDate(new Date(startDate))

    const taskData = {
      title,
      address,
      description,
      companyEmail:clients.find(company=>company.id==selectedClient).email,
      // technician: doc(db, "Technicians", `${selectedTechnician}`),
      companyRef: doc(db, "Clients", `${selectedClient}`),
      company: clients.find(company=>company.id==selectedClient).companyName,
      isArrived: false,
      isVerified: false,
      isCompleted: false,
      startDate : startDateTimeStamp,
      email: "ajanith101@gmail.com"
      
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="client">Client:</label>
          <select
            id="client"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.companyName}
              </option>
            ))}
          </select>
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
            disabled={sameAsCompanyAddress}
            onClick={(e) => {
              e.preventDefault();
              const theClient = clients.find(
                (obj) => obj.id === selectedClient
              );
              setAddress(theClient.address);
              setSameAsCompanyAddress(true);
            }}
          >
            Same As Company Address
          </button>
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
        {/* <div>
          <label htmlFor="technician">Technician:</label>
          <select
            id="technician"
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            required
          >
            <option value="">Select a technician</option>
            {technicians.map((technician) => (
              <option key={technician.id} value={technician.id}>
                {technician.firstName} {technician.lastName}
              </option>
            ))}
          </select>
        </div> */}

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
        {/* <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div> */}

        <div>
          {/* <DateTimePicker
  label="Uncontrolled picker"
  defaultValue={dayjs('2022-04-17T15:30')}
/> */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDateTimePicker"]}>
              <DemoItem>
                <MobileDateTimePicker
                  value={startDateTime}
                  onChange={(newValue) =>
                    setStartDateTime(newValue.toISOString())
                  }
                  defaultValue={dayjs("2023-06-25T05:30:00.000Z")}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider> */}
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};
