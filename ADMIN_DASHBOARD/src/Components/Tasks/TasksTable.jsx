import React, { useContext, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsCheckAll } from "react-icons/bs";
import { RiShieldCheckLine } from "react-icons/ri";
import { MdCreate, MdDelete } from "react-icons/md";
import styles from "../../Styles/Tasks/TasksTable.module.scss";
import { DataContext } from "../../Context/dataContext";

export const TasksTable = ({
  tasks,
  searchTerm,
  searchColumn,
  taskEdit,
  taskVerify,
}) => {
  const [sortBy, setSortBy] = useState("companyName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteError, setShowDeleteError] = useState(false);
  const { technicians } = useContext(DataContext);

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (taskId) => {
    console.log("Delete button clicked");
    confirmDelete(taskId);
  };

  const checkTechnicianInTaskCollection = async (technicianId) => {
    try {
      const queryRef = collection(db, "Tasks");
      const querySnapshot = await getDocs(queryRef);

      // Check if the technicianId is assigned to any task
      return querySnapshot.docs.some(
        (doc) => doc.data().technicianId === technicianId
      );
    } catch (error) {
      console.error("Error checking technician in task collection:", error);
      return false; // Assume error means technician is not in any task
    }
  };

  const confirmDelete = async (taskId) => {
    console.log("Confirm delete called");

    const inTaskCollection = await checkTechnicianInTaskCollection(taskId);

    if (inTaskCollection) {
      setShowDeleteError(true);
    } else {
      await deleteTask(taskId);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "Tasks", taskId);

      await deleteDoc(taskRef);

      console.log(`Task with ID ${taskId} has been deleted.`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const closeDeleteError = () => {
    setShowDeleteError(false);
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
              <button onClick={() => handleSort("companyName")}>
                {sortDirection === "asc" && sortBy === "companyName" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}
              </button>
            </th>
            <th>
              Task Address{" "}
              <button onClick={() => handleSort("address")}>
                {sortDirection === "asc" && sortBy === "address" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}
              </button>
            </th>
            <th>Company Address</th>
            <th>Arrival Status</th>
            <th>Verification Status</th>
            <th>Technician Name</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
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
              <td>
                {task.isVerified ? (
                  <button className={styles.btn + " " + styles.verified}><BsCheckAll/>Verified</button>
                ) : !task.isCompleted ? (
                  <button className={styles.btn + " " + styles.not_verify}>Not Verified</button>
                ) : (
                  <button className={styles.btn + " " + styles.verify} onClick={() => {
                    taskVerify(task);
                  }}>
                    <RiShieldCheckLine />
                    Verify
                  </button>
                )}
              </td>
              <td>
                {technicians.find(
                  (technician) => technician.email === task.email
                )?.firstName || "No Technician"}{" "}
                {technicians.find(
                  (technician) => technician.email === task.email
                )?.lastName || ""}
              </td>
              <td>
                {task.startDate
                  ? task.startDate.toDate().toLocaleDateString()
                  : ""}
              </td>
              <td>
                <button
                  className={styles.btn + " " + styles.editBtn}
                  onClick={() => {
                    taskEdit(task);
                  }}
                >
                  <MdCreate />
                  Edit
                </button>
              </td>
              <td>
                <button
                  className={styles.btn + " " + styles.deleteBtn}
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  <MdDelete />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteError && (
        <div className={styles.delete_error_message}>
          <p>Task is assigned to a technician. Cannot delete.</p>
          <button onClick={closeDeleteError}>OK</button>
        </div>
      )}
    </div>
  );
};
