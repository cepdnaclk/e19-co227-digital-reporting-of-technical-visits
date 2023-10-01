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
  const rows = technicians.map((tech) => {
    // Initialize an empty row with time slot cells
    const rowCells = Array(numSlots + 1).fill(null);

    // Populate the row with task cells based on the technician's tasks
    tasks.forEach((task) => {
      const slotIndex = Math.floor((task.startTime - startTime) / slotDuration);

      if (tech.id === task.technicianId) {
        rowCells[slotIndex] = (
          <td key={task.id} className="task-cell">
            {task.title}
          </td>
        );
      }
    });

    // Create a row with technician name and task cells
    return (
      <tr key={tech.id}>
        <td className="technician-cell">{tech.name}</td>
        {rowCells.map((cell, index) => (
          <td key={index} className="time-slot-cell">
            {cell}
          </td>
        ))}
      </tr>
    );
  });

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
