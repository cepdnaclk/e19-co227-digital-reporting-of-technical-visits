import React, { useState } from "react";

import "../../Styles/Technicians/TechniciansTable.scss"; 
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { TechnicianEditForm } from "./TechnicianEditForm"; 

export const TechniciansTable = ({ technicians, searchTerm, searchColumn }) => {
  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedTechnician, setSelectedTechnician] = useState(null); 
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); 

  const [showTechnicianDetails, setShowTechnicianDetails] = useState(false);

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

  // Function to open the edit form with the selected technician data
  const openEditForm = (technician) => {
    setSelectedTechnician(technician);
    setIsEditFormVisible(true);
  };

  // Function to close the edit form
  const closeEditForm = () => {
    setSelectedTechnician(null);
    setIsEditFormVisible(false);
  };

  return (
    <div className="table-container-2">
      <table className="tech-table">
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
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id}>
              <td>
                <button onClick={() => handleTechnicianClick(technician)}>
                  {technician.firstName} {technician.lastName}
                </button>
              </td>
              <td>{technician.email}</td>
              <td>{technician.address}</td>
              <td>{technician.mobile[0]}</td>
              <td>
                <button onClick={() => openEditForm(technician)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the edit form as a modal/popup when needed */}
      {isEditFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditForm}>
              &times;
            </span>
            {/* Pass the selected technician to the edit form */}
            <TechnicianEditForm
              technician={selectedTechnician}
              onClosing={closeEditForm}
            />
          </div>
        </div>
      )}
      {showTechnicianDetails && selectedTechnician && (
        <div
          className={`technician-details ${
            showTechnicianDetails ? "" : "closed"
          }`}
        >
          <button className="close-button" onClick={closeTechnicianDetails}>
            &#10006;
          </button>
          <h2>Technician Details</h2>
          <p>
            Name: {selectedTechnician.firstName} {selectedTechnician.lastName}
          </p>
          <p>Email: {selectedTechnician.email}</p>
          <p>Address: {selectedTechnician.address}</p>
          <p>Telephone Number: {selectedTechnician.mobile[0]}</p>
        </div>
      )}
    </div>
  );
};
