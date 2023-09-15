import React, { useState } from "react";
import "../../Styles/Technicians/TechniciansTable.scss"; // Import your SCSS stylesheet
import { BsSortAlphaDown,  BsSortAlphaDownAlt} from "react-icons/bs";


export const TechniciansTable = ({ technicians,searchTerm,searchColumn}) => {

  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");
  //   const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
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
    if (searchColumn ==="Name"){
      const fullName =
      `${technician.firstName} ${technician.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
    }
    else if (searchColumn ==="Email"){
      
    return technician.email.includes(searchTerm.toLowerCase());
    }
    else if (searchColumn ==="Address"){
    return technician.address.includes(searchTerm.toLowerCase());
    }
   
    else if (searchColumn ==="TP"){
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
              <button onClick={() => handleSort("firstName")}>{sortDirection === "asc" && sortBy === "firstName" ? <BsSortAlphaDownAlt/> : <BsSortAlphaDown/>}</button>
            </th>
            <th>
              Email Address{" "}
              <button onClick={() => handleSort("email")}>{sortDirection === "asc" && sortBy === "email" ? <BsSortAlphaDownAlt/> : <BsSortAlphaDown/>}</button>
            </th>
            <th>
              Address <button onClick={() => handleSort("address")}>{sortDirection === "asc" && sortBy === "address" ? <BsSortAlphaDownAlt/> : <BsSortAlphaDown/>}</button>
            </th>
            <th>Telephone Number </th>
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id}>
              <td>
                {technician.firstName} {technician.lastName}
              </td>
              <td>{technician.email}</td>
              <td>{technician.address}</td>
              <td>{technician.mobile[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
