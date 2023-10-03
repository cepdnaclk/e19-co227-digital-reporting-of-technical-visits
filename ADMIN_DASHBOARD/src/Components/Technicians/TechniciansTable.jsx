import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import styles from "../../Styles/Technicians/TechniciansTable.module.scss";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { TechnicianEditForm } from "./TechnicianEditForm";
import classNames from "classnames";
import { collection, addDoc, onSnapshot, doc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import "firebase/firestore";

export const TechniciansTable = ({
  technicians,
  searchTerm,
  searchColumn,
  technicianEdit,
  deleteTechnician,
}) => {
  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const [showTechnicianDetails, setShowTechnicianDetails] = useState(false);

  useEffect(() => {
    // Add 'open' class to the body to hide overflow
    if (showTechnicianDetails) {
      document.body.classList.add("open");
    } else {
      // Remove 'open' class from the body to show overflow
      document.body.classList.remove("open");
    }
  }, [showTechnicianDetails]);

  const handleSort = (field) => {
    setShowTechnicianDetails(false);
    setSelectedTechnician(null);

    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleTechnicianClick = (technician) => {
    setShowTechnicianDetails(true);
    setSelectedTechnician(technician);
  };

  const closeTechnicianDetails = () => {
    setShowTechnicianDetails(false);
    setSelectedTechnician(null);
  };

  const sortedTechnicians = [...technicians].sort((a, b) => {
    const aValue = sortBy ? a[sortBy] : a.name;
    const bValue = sortBy ? b[sortBy] : b.name;

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredTechnicians = sortedTechnicians.filter((technician) => {
    if (searchColumn === "Name") {
      const fullName =
        `${technician.firstName} ${technician.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Email") {
      return technician.email.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Address") {
      return technician.address.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "TP") {
      return technician.mobile[0].includes(searchTerm.toLowerCase());
    }
  });

  const openEditForm = (technician) => {
    setSelectedTechnician(technician);
    setIsEditFormVisible(true);
  };

  const closeEditForm = () => {
    setSelectedTechnician(null);
    setIsEditFormVisible(false);
  };

  return (
    <div className={styles.table_container_2}>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${showTechnicianDetails ? "open" : ""}`}
      />

      <table className={styles.tech_table}>
        <thead>
          <tr>
            <th>
              Technician Name{" "}
              <button onClick={() => handleSort("firstName")}>
                {sortDirection === "asc" && searchColumn === "Name" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}
              </button>
            </th>
            <th>
              Email Address{" "}
              <button onClick={() => handleSort("email")}>
                {sortDirection === "asc" && searchColumn === "Email" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}
              </button>
            </th>
            <th>
              Address{" "}
              <button onClick={() => handleSort("address")}>
                {sortDirection === "asc" && searchColumn === "Address" ? (
                  <BsSortAlphaDownAlt />
                ) : (
                  <BsSortAlphaDown />
                )}
              </button>
            </th>
            <th>Telephone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id}>
              <td onClick={() => handleTechnicianClick(technician)}>
                {technician.firstName} {technician.lastName}
              </td>
              <td onClick={() => handleTechnicianClick(technician)}>
                {technician.email}
              </td>
              <td onClick={() => handleTechnicianClick(technician)}>
                {technician.address}
              </td>
              <td onClick={() => handleTechnicianClick(technician)}>
                {technician.mobile[0]}
              </td>
              <td>
                <button
                  className={classNames(styles.btn, styles.editBtn)}
                  onClick={() => technicianEdit(technician)}
                >
                  <MdCreate />
                  Edit
                </button>
                <button
                  className={classNames(styles.btn, styles.deleteBtn)}
                  onClick={() => deleteTechnician(technician.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showTechnicianDetails && selectedTechnician && (
        <div
          className={classNames(
            styles.technician_details,
            showTechnicianDetails ? "" : styles.closed
          )}
        >
          <button
            className={styles.close_button}
            onClick={closeTechnicianDetails}
          >
            &#10006;
          </button>
          <h2>Technician Details</h2>
          <div className={styles.info_section}>
            <p>
              <FaUser />
              Name: {selectedTechnician.firstName} {selectedTechnician.lastName}
            </p>
            <p>
              <FaEnvelope />
              Email: {selectedTechnician.email}
            </p>
            <p>
              <FaMapMarker />
              Address: {selectedTechnician.address}
            </p>
            <p>
              <FaPhone />
              Telephone Number: {selectedTechnician.mobile[0]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};






