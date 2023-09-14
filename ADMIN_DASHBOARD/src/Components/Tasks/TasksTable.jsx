import React, { useState } from "react";
import "../../Styles/Tasks/TasksTable.scss"; // Import your SCSS stylesheet

export const TasksTable = ({ tasks,searchTerm,searchColumn }) => {
  const [sortBy, setSortBy] = useState("companyName");
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
    console.log(sortBy);
    console.log(tasks);

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredTasks = sortedTasks.filter((task) => {

    if(searchColumn==="Task Name")
    return task.visitType.toLowerCase().includes(searchTerm.toLowerCase());
    else if(searchColumn==="Company")
    return task.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    else if(searchColumn==="Address")
    return task.address.toLowerCase().includes(searchTerm.toLowerCase());
    else if(searchColumn==="Technician Name")
    return task.technicianName.toLowerCase().includes(searchTerm.toLowerCase());
    


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
              <button onClick={() => handleSort("companyName")}>^</button>
            </th>
            <th>
              Task Address <button onClick={() => handleSort("address")}>^</button>
            </th>
            <th>
              Company Address
            </th>
            <th>
              Verification Status
            </th>
            <th>
              Arrival Status
            </th>
            <th>
              Technician Name{" "}
              <button onClick={() => handleSort("technicianName")}>^</button>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.visitType}</td>
              <td>{task.companyName}</td>
              <td>{task.address}</td>
              <td>{task.companyAddress}</td>
              <td>{task.isArrived && <p>Arrived</p>}{!task.isArrived && <p>Not Arrived</p>}</td>
              <td>{task.isverified && <p>Verified</p>}{!task.isverified && <p>Not Verified</p>}</td>
              <td>{task.technicianName}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
