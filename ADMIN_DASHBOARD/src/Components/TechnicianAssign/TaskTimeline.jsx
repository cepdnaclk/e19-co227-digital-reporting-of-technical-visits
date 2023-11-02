import React, { useState } from "react";
import "../../Styles/TaskTimeline.scss";

const TaskTimeline = ({
  tasks,
  startTime,
  endTime,
  slotDuration,
  technicians,
  technicianSelectionHandler,
  timeslotSelectionHandler,
  formHandler,
  setTask,
  setVerfiy,
  
}) => {
  // Calculate the number of time slots
  const numSlots = Math.floor((endTime - startTime) / slotDuration);

  // Create an array of time slot labels
  const timeSlots = [];
  for (let i = 0; i <= numSlots; i++) {
    const slotTime = new Date(startTime.getTime() + i * slotDuration);
    timeSlots.push(
      slotTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }
  const [showTaskInfo, setShowTaskInfo] = useState(null);

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });


  const[showTaskVerifyForm,setShowTaskVerifyForm] = useState(false);

  const handleMouseEnter = (index, event) => {
    if (!event) return; // Check if event is undefined
    // if(showTaskInfo) return;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const taskCell = event.currentTarget;
    const cellRect = taskCell.getBoundingClientRect();

    const isTopCorner = mouseY < cellRect.top + cellRect.height / 2;
    const isLeftCorner = mouseX < cellRect.left + cellRect.width / 2;

    const tooltipPosition = {
      top: isTopCorner ? mouseY : mouseY - 150,
      left: isLeftCorner ? mouseX : mouseX - 150,
    };

    setTooltipPosition(tooltipPosition);
    setShowTaskInfo(index);
  };

  const handleMouseLeave = () => {
    setShowTaskInfo(null);
  };

  // Create a table row for each technician
  const rows = technicians.map((tech, rowIndex) => {
    // Initialize an empty row with time slot cells
    const rowCells = Array(numSlots + 1).fill(null);

    // Populate the row with task cells based on the technician's tasks
    tasks.forEach((task, index) => {
      const taskStartDate = task.startDate.toDate();
      const startYear = startTime.getFullYear();
      const startMonth = startTime.getMonth();
      const startDay = startTime.getDate();

      if (
        taskStartDate.getFullYear() === startYear &&
        taskStartDate.getMonth() === startMonth &&
        taskStartDate.getDate() === startDay
      ) {
        const slotIndex = Math.floor(
          (taskStartDate - startTime) / slotDuration
        );
        console.log(task, slotIndex, startDay, startMonth, startYear);
        if (tech.email === task.email && slotIndex <= numSlots) {
          rowCells[slotIndex] = (
            <td
              key={index}
              index={index}
              className="task-cell"
              // onMouseEnter={() => handleMouseEnter(index,event)}
              // onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: task.isVerified
                  ? "rgba(20, 100, 30, 0.7)"
                  : task.isCompleted
                  ? "rgba(3, 26, 66, 0.8)"
                  : task.isArrived
                  ? "rgba(200,160,50, 0.8)"
                  : "rgba(200,40,50, 0.8)",
                  border: "none"
              }}

              onClick={
                () => handleCellClick(timeSlots[slotIndex], tech,task)
              }
            >
              <div className="task-title">{task.title}</div>
            </td>
          );
        }
      }
    });

    // Create a row with technician name and task cells
    return (
      <tr key={tech.id}>
        <td className="technician-cell">{tech.firstName}</td>
        {rowCells.map((cell, columnIndex) => (
          <td
            key={columnIndex}
            className={`time-slot-cell${cell ? " filled-cell" : ""}`}
            onClick={
              cell ? null : () => handleCellClick(timeSlots[columnIndex], tech)
            }
          >
            {cell}
          </td>
        ))}
      </tr>
    );
  });

  const handleCellClick = (timeSlot, technician,task) => {
    if (task){
      
      console.log("Hi")
      setTask(task);
      setVerfiy(true);
    }
    else{
      technicianSelectionHandler(technician);
    timeslotSelectionHandler(timeSlot);
    formHandler(true);
    // Call the onCellClick function and pass the timeSlot and technician as arguments
    console.log("Clicked on cell for time slot:", timeSlot);
    console.log("Technician:", technician.firstName);

    }

    // Add your logic to assign a job to the technician for the clicked slot here
  };

  return (
    <div className="task-timeline">
      <div
        className="task-tooltip"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          display: showTaskInfo !== null ? "block" : "none",
        }}
      >
        {showTaskInfo !== null && (
          <div className="task-info">
            <p>Title: {tasks[showTaskInfo].title}</p>

            <p>Description: {tasks[showTaskInfo].description}</p>
            <p>
              Arrival Status:
              {tasks[showTaskInfo].isArrived ? "Completed" : "Not Completed"}{" "}
            </p>
            <p>
              Verification Status Status:
              {tasks[showTaskInfo].isVerified ? "Completed" : "Not Completed"}{" "}
            </p>
            <p>
              Completion Status:
              {tasks[showTaskInfo].isCompleted ? "Completed" : "Not Completed"}{" "}
            </p>
            <p>Description: {tasks[showTaskInfo].description}</p>
            {/* Display more task information here */}
            <p>Assigned to: {tasks[showTaskInfo].technicianName}</p>
            {/* Add more task details as needed */}
          </div>
        )}
      </div>
      <table className="timeline-table">
        <thead>
          <tr>
            <th className="empty-cell"></th>
            {timeSlots.map((slot, index) => (
              <th key={index} className="time-slot-label">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default TaskTimeline;
