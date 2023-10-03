import React, { useState } from "react";
import styles from "../../Styles/Tasks/TasksTable.module.scss"; // Import your SCSS stylesheet
import { BsSortAlphaDown,BsSortAlphaDownAlt } from "react-icons/bs";
import { MdCreate } from "react-icons/md";

export const TasksTable = ({ tasks, searchTerm, searchColumn,taskEdit }) => {
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

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredTasks = sortedTasks.filter((task) => {
    
    if (searchColumn === "Task Name")
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    else if (searchColumn === "Company")
      return task.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    else if (searchColumn === "Address")
      return task.address.toLowerCase().includes(searchTerm.toLowerCase());
    else if (searchColumn === "Technician Name")
      return task.technicianName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.table_container_2}>
      <table className={styles.task_table}>
        <thead>
          <tr>
            <th>
              Task Name
              <button onClick={() => handleSort("title")}>
                {sortDirection === "asc" && sortBy === "title" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}
              </button>
            </th>
            <th>
              Company{" "}
              <button onClick={() => handleSort("companyName")}>{sortDirection === "asc" && sortBy === "companyName" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}</button>
            </th>
            <th>
              Task Address{" "}
              <button onClick={() => handleSort("address")}>{sortDirection === "asc" && sortBy === "address" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}</button>
            </th>
            <th>Company Address</th>
            <th>Verification Status</th>
            <th>Arrival Status</th>
            <th>
              Technician Name{" "}
              {/* <button onClick={() => handleSort("technicianName")}>^</button> */}
            </th>
            <th>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.companyName || "No company"}</td>
              <td>{task.address}</td>
              <td>{task.companyAddress || "No Company Address"}</td>
              <td>{task.isArrived ? <p>Arrived</p> : <p>Not Arrived</p>}</td>
              <td>{task.isverified ? <p>Verified</p> : <p>Not Verified</p>}</td>
              <td>{task.technicianName || "No Technician"}</td>
              <td>{task.startDate ? task.startDate.toDate().toLocaleDateString() : ""}</td>
              <td>
                <button
                  
                  onClick={() => {
                    taskEdit(task);
                  }}
                >
                  <MdCreate />
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
