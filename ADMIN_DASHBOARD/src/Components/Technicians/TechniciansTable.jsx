import React, { useState } from "react";

import "../../Styles/Technicians/TechniciansTable.scss"; 
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { TechnicianEditForm } from "./TechnicianEditForm"; // Import the TechnicianEditForm component

export const TechniciansTable = ({ technicians, searchTerm, searchColumn }) => {
  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedTechnician, setSelectedTechnician] = useState(null); // State to store the selected technician
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); // State to control the visibility of the edit form

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
      const fullName = `${technician.firstName} ${technician.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Email") {
      return technician.email.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Address") {
      return technician.address.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "TP") {
      return technician.mobile[0].includes(searchTerm.toLowerCase());
    }
  });

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
            </tr>
          ))}
        </tbody>
      </table>
      {showTechnicianDetails && selectedTechnician && (
        <div className={`technician-details ${showTechnicianDetails ? "" : "closed"}`}>
          <button className="close-button" onClick={closeTechnicianDetails}>
            &#10006;
          </button>
          <h2>Technician Details</h2>
          <div className="info-section">
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
