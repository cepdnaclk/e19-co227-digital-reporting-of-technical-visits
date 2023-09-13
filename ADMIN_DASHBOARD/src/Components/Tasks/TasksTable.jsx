import React, { useState } from "react";
import "../../Styles/Tasks/TasksTable.scss"; // Import your SCSS stylesheet

export const TasksTable = ({ tasks,searchTerm }) => {
  const [sortBy, setSortBy] = useState("company");
  const [sortDirection, setSortDirection] = useState("asc");
  

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aValue = sortBy ? a[sortBy] : a.name;
    const bValue = sortBy ? b[sortBy] : b.name;

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredTasks = sortedTasks.filter((task) => {
    return task.company.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="table-container-2">
      <table className="task-table">
        <thead>
          <tr>
            <th>
              Task Name{" "}
              <button onClick={() => handleSort("visitType")}>^</button>
            </th>
            <th>
            Company{" "}
              <button onClick={() => handleSort("company")}>^</button>
            </th>
            <th>
              Technician Name{" "}
              <button onClick={() => handleSort("technicianName")}>^</button>
            </th>
            {/* Add more table headers for other task properties */}
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
                <td>{task.visitType}</td>
              <td>{task.company}</td>
              <td>{task.technicianName}</td>
              {/* Add more table cells for other task properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
