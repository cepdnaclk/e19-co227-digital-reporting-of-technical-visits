import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import TaskTimeline from "./TaskTimeline";
import styles from "../../Styles/TechnicianAssign/TimelineHandler.module.scss";

const TimelineHandler = ({
  jobs,
  technicians,
  technicianSelectionHandler,
  timeslotSelectionHandler,
  formHandler,
  dateHandler,
  setTask,
  setVerify
}) => {
  console.log("Rerender");
  const [selectedTab, setSelectedTab] = useState("today");
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("Selected Date1231231:", selectedDate);

  const [selectedDateString, setSelectedDateString] = useState(
    selectedDate.toISOString().split("T")[0]
  );
  console.log("Selected Date1231231:", selectedDateString);
  const [startDateTime, setStartDateTime] = useState(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      8, // Start time: 8:00 AM
      0
    )
  );
  const [endDateTime, setEndDateTime] = useState(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      17, // End time: 5:00 PM
      0
    )
  );
  console.log("start", startDateTime);
  console.log("end", endDateTime);

  const handleTabChange = (tab) => {
    console.log("Tab changed to:", tab); // Add this line

    setSelectedTab(tab);
    if (tab === "today") {
      const today = new Date();
      console.log("today");
      setSelectedDate(today);
      console.log("Selected Date:", selectedDate);
      setSelectedDateString(today.toISOString().split("T")[0]);
      setStartDateTime(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          8, // Start time: 8:00 AM
          0
        )
      );
      setEndDateTime(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          17, // End time: 5:00 PM
          0
        )
      );
      dateHandler(today);
    } else if (tab === "past") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      console.log("yesterday", yesterday);
      setSelectedDate(yesterday);
      console.log("Selected Date:", selectedDate);
      setSelectedDateString(yesterday.toISOString().split("T")[0]);
      setStartDateTime(
        new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate(),
          8, // Start time: 8:00 AM
          0
        )
      );

      setEndDateTime(
        new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate(),
          17, // End time: 5:00 PM
          0
        )
      );
      dateHandler(yesterday);
    } else if (tab === "upcoming") {
      console.log("tommorow");
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow);
      console.log("Selected Date:", selectedDate);
      setSelectedDateString(tomorrow.toISOString().split("T")[0]);
      setStartDateTime(
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          8, // Start time: 8:00 AM
          0
        )
      );
      setEndDateTime(
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          17, // End time: 5:00 PM
          0
        )
      );
      dateHandler(tomorrow);
    }
  };

  const handleDateChange = (event) => {
    const selectedDateString2 = event.target.value;
    console.log("Date changed to:", selectedDateString2); // Add this line
    setSelectedDateString(selectedDateString2);

    // Parse the selected date string into a Date object
    const selectedDate = new Date(selectedDateString2);
    console.log("Parsed Date:", selectedDate); // Add this line
    setSelectedDate(selectedDate);
    dateHandler(selectedDate);

    // Update startDateTime and endDateTime when selectedDate changes
    setStartDateTime(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        8, // Start time: 8:00 AM
        0
      )
    );
    setEndDateTime(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        17, // End time: 5:00 PM
        0
      )
    );
  };

  const [selectedState, setSelectedState] = useState("today"); // Initialize with the default state

  return (
    <div className={styles.handler_container}>
      <div className={styles.tabs}>
        <div className={styles.toggleSwitch}>
          <button
            className={`${styles.toggleItem} ${
              selectedTab === "past" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("past")}
          >
            Past
          </button>
          <button
            className={`${styles.toggleItem} ${
              selectedTab === "today" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("today")}
          >
            Today
          </button>
          <button
            className={`${styles.toggleItem} ${
              selectedTab === "upcoming" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("upcoming")}
          >
            Upcoming
          </button>
          <div
            className={`${styles.activeIndicator} ${
              selectedTab === "past"
                ? styles.past
                : selectedTab === "today"
                ? styles.today
                : styles.upcoming
            }`}
          ></div>
        </div>

        {/* <Tab
          activeTab={selectedTab}
          onTabChange={handleTabChange}
          tabs={["past", "today", "upcoming"]}
        /> */}
      </div>
      {selectedTab !== "today" && (
        <div className={styles.date_input}>
          <p>Select Date:</p>
          {selectedTab == "upcoming" && (
            <input
              type="date"
              value={selectedDateString}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
            />
          )}
          {selectedTab == "past" && (
            <input
              type="date"
              value={selectedDateString}
              onChange={handleDateChange}
              max={new Date().toISOString().split("T")[0]}
            />
          )}
        </div>
      )}
      {selectedTab == "today" && (
        <p className={styles.today_date}>{selectedDateString}</p>
      )}
      <div className={styles.table_container}>
        <TaskTimeline
          tasks={jobs}
          startTime={startDateTime}
          endTime={endDateTime}
          slotDuration={60 * 60 * 1000} // Slot duration is 1 hour
          technicians={technicians}
          formHandler={formHandler}
          technicianSelectionHandler={technicianSelectionHandler}
          timeslotSelectionHandler={timeslotSelectionHandler}
          setTask = {setTask}
          setVerfiy = {setVerify}
        />
      </div>
    </div>
  );
};

export default TimelineHandler;
