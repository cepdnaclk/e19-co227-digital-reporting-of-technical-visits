import React from 'react';
import "../../Styles/TaskTimeline.scss"

const TaskTimeline = ({ tasks, startTime, endTime, slotDuration, technicians }) => {
  // Calculate the number of time slots
  const numSlots = Math.floor((endTime - startTime) / slotDuration);

  // Create an array of time slot labels
  const timeSlots = [];
  for (let i = 0; i <= numSlots; i++) {
    const slotTime = new Date(startTime.getTime() + i * slotDuration);
    timeSlots.push(slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  // Create a table row for each technician
  const rows = technicians.map((tech, rowIndex) => {
    
    // Initialize an empty row with time slot cells
    const rowCells = Array(numSlots + 1).fill(null);
    console.log(tasks);

    // Populate the row with task cells based on the technician's tasks
    tasks.forEach((task,index) => {
      
   

// Create a Date object from the timestamp
const taskStartDate = task.startDate.toDate();
console.log(taskStartDate);
console.log(startTime);
      const slotIndex = Math.floor((taskStartDate  - startTime) / slotDuration);
      console.log(slotIndex)

      if (tech.email=== task.email) {
        rowCells[slotIndex] = (
          <td index={index} className="task-cell">
            {task.title}
          </td>
        );
      }
    });
    

    // Create a row with technician name and task cells
    return (
      <tr key={tech.id}>
        <td className="technician-cell">{tech.firstName}</td>
        {rowCells.map((cell, columnIndex) => (
          <td
            key={columnIndex}
            className={`time-slot-cell${cell ? ' filled-cell' : ''}`}
            onClick={cell ? null : () => handleCellClick(timeSlots[columnIndex], tech)}
          >
            {cell}
          </td>
        ))}
      </tr>
    );
  });

  const handleCellClick = (timeSlot, technician) => {
    // Call the onCellClick function and pass the timeSlot and technician as arguments
    console.log("Clicked on cell for time slot:", timeSlot);
    console.log("Technician:", technician.firstName);

    // Add your logic to assign a job to the technician for the clicked slot here
  };

  return (
    <div className="task-timeline">
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
