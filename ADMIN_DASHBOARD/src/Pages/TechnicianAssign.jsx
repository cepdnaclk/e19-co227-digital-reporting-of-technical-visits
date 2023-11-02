import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import styles from "../Styles/TechniciansAssign.module.scss";
import TaskTimeline from "../Components/TechnicianAssign/TaskTimeline"; // Import the TaskTimeline component
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../Context/dataContext";
import TimelineHandler from "../Components/TechnicianAssign/TimelineHandler";
import TechnicianAssignForm from "../Components/TechnicianAssign/TechnicianAssignForm";
import TaskLegend from "../Components/TechnicianAssign/TaskLegend";
import Notification from "../Components/Notification";
import { TaskVerifyForm } from "../Components/Tasks/TaskVerifyForm";

export const TechnicianAssign = () => {
  // Sample data for tasks, start time, end time, slot duration, and technicians
  const { jobs, technicians } = useContext(DataContext);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState();
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const [selectedParentDate, setSelectedParentDate] = useState(new Date());
  const [selectedTask,setSelectedTask] = useState();
  const [showVerifyForm,setShowVerifyForm] = useState(false);

  const backgroundClick = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);

    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowAssignForm(false);
    }
  };

  const closeVerifyForm = () => {
    setShowVerifyForm(false);
    setSelectedTask(null);
  };

  // const tasks = [
  //   {
  //     id: 1,
  //     title: "Repair HVAC System",
  //     startTime: new Date(2023, 9, 20, 10, 0),
  //     technicianId: 1,
  //   },
  //   {
  //     id: 2,
  //     title: "Install Security Cameras",
  //     startTime: new Date(2023, 9, 20, 10, 0),
  //     technicianId: 2,
  //   },
  //   {
  //     id: 3,
  //     title: "Network Setup",
  //     startTime: new Date(2023, 9, 20, 14, 0),
  //     technicianId: 3,
  //   },
  //   {
  //     id: 4,
  //     title: "Fix Plumbing Issue",
  //     startTime: new Date(2023, 9, 20, 11, 0),
  //     technicianId: 1,
  //   },
  //   {
  //     id: 5,
  //     title: "Replace Roof Shingles",
  //     startTime: new Date(2023, 9, 20, 13, 0),
  //     technicianId: 4,
  //   },
  //   {
  //     id: 6,
  //     title: "Electrical Wiring Inspection",
  //     startTime: new Date(2023, 9, 20, 12, 0),
  //     technicianId: 2,
  //   },
  //   {
  //     id: 7,
  //     title: "Painting Living Room",
  //     startTime: new Date(2023, 9, 20, 14, 0),
  //     technicianId: 5,
  //   },
  //   {
  //     id: 8,
  //     title: "Fix Leaky Faucet",
  //     startTime: new Date(2023, 9, 20, 11, 0),
  //     technicianId: 1,
  //   },
  //   {
  //     id: 9,
  //     title: "Security System Upgrade",
  //     startTime: new Date(2023, 9, 20, 15, 0),
  //     technicianId: 2,
  //   },
  //   {
  //     id: 10,
  //     title: "Install Smart Thermostat",
  //     startTime: new Date(2023, 9, 20, 12, 0),
  //     technicianId: 3,
  //   },
  //   {
  //     id: 11,
  //     title: "Carpentry Work",
  //     startTime: new Date(2023, 9, 20, 16, 0),
  //     technicianId: 4,
  //   },
  //   {
  //     id: 12,
  //     title: "Appliance Repair",
  //     startTime: new Date(2023, 9, 20, 13, 0),
  //     technicianId: 5,
  //   },
  //   {
  //     id: 13,
  //     title: "Fix Garage Door",
  //     startTime: new Date(2023, 9, 20, 17, 0),
  //     technicianId: 1,
  //   },
  //   {
  //     id: 14,
  //     title: "Install Solar Panels",
  //     startTime: new Date(2023, 9, 20, 14, 0),
  //     technicianId: 2,
  //   },
  //   {
  //     id: 15,
  //     title: "Plumbing Repair",
  //     startTime: new Date(2023, 9, 20, 18, 0),
  //     technicianId: 3,
  //   },
  //   {
  //     id: 16,
  //     title: "Roof Inspection",
  //     startTime: new Date(2023, 9, 20, 15,0),
  //     technicianId: 4,
  //   },
  //   {
  //     id: 17,
  //     title: "Home Theater Installation",
  //     startTime: new Date(2023, 9, 20, 19, 0),
  //     technicianId: 5,
  //   },
  //   {
  //     id: 18,
  //     title: "Gardening and Landscaping",
  //     startTime: new Date(2023, 9, 20, 16, 0),
  //     technicianId: 1,
  //   },
  //   {
  //     id: 19,
  //     title: "Kitchen Remodeling",
  //     startTime: new Date(2023, 9, 20, 20, 0),
  //     technicianId: 2,
  //   },
  //   {
  //     id: 20,
  //     title: "Appliance Installation",
  //     startTime: new Date(2023, 9, 20, 17, 0),
  //     technicianId: 3,
  //   },
  // ];

  // const technicians = [
  //   {
  //     id: 1,
  //     name: "John Smith",
  //   },
  //   {
  //     id: 2,
  //     name: "Alice Johnson",
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Davis",
  //   },
  //   {
  //     id: 4,
  //     name: "Sarah White",
  //   },
  //   {
  //     id: 5,
  //     name: "David Malan",
  //   },
  //   // Add more technicians as needed
  // ];
  const startTime = new Date(2023, 9, 1, 8, 0); // Replace with your desired start time
  const endTime = new Date(2023, 9, 1, 17, 0); // Replace with your desired end time
  const slotDuration = 60 * 60 * 1000; // hour in milliseconds

  return (
    <div>
      {showAssignForm && (
            <div className={styles.cardContainer} ref={backgroundClick}>
              <TechnicianAssignForm
                technician={selectedTechnician}
                timeslot={selectedTimeslot}
                date={selectedParentDate}
                onClose={() => {
                  setShowAssignForm(false);
                }}
              />
            </div>
          )}

    {showVerifyForm && (
        <div className={styles.cardContainer} >
          <TaskVerifyForm task={selectedTask} onClosing={closeVerifyForm} />
        </div>
      )}
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <Notification />
        <div className={styles.component_container}>
          <div className={styles.legend_container}>
            <TaskLegend />
          </div>

          <div className={styles.name}>
            <p>Technician Assign</p>
          </div>

          {/* Include the TaskTimeline component */}
          <div className={styles.table_container}>
            <TimelineHandler
              jobs={jobs}
              technicians={technicians}
              formHandler={setShowAssignForm}
              technicianSelectionHandler={setSelectedTechnician}
              timeslotSelectionHandler={setSelectedTimeslot}
              dateHandler={setSelectedParentDate}
              setTask = {setSelectedTask}
              setVerify = {setShowVerifyForm}
            />
            {/* <TaskTimeline
              tasks={jobs}
              startTime={startTime}
              endTime={endTime}
              slotDuration={slotDuration}
              technicians={technicians}
            /> */}
          </div>

          
        </div>
      </div>
    </div>
  );
};
