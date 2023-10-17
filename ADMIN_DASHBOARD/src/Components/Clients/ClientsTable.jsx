import React, { useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../Styles/Clients/ClientsTable.module.scss";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import classNames from "classnames";
import { MdCreate, MdDelete } from "react-icons/md";
import { ClientEditForm } from "../../Components/Clients/ClientEditForm";

export const ClientsTable = ({ clients, searchTerm, searchColumn, clientEdit }) => {
  const [sortBy, setSortBy] = useState("companyName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };


  const handleDelete = async (clientId) => {
    // delete logic
  };

  const sortedClients = [...clients].sort((a, b) => {
    const aValue = sortBy
      ? (a[sortBy] || "").toString()
      : (a.name || "").toString();
    const bValue = sortBy
      ? (b[sortBy] || "").toString()
      : (b.name || "").toString();

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredClients = sortedClients.filter((client) => {
    if (searchColumn === "companyName") {
      const fullName = `${(client.firstName || "").toLowerCase()} ${(
        client.lastName || ""
      ).toLowerCase()}`;
      return fullName.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Email") {
      return (client.email || "").includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Address") {
      return (client.address || "").includes(searchTerm.toLowerCase());
    } else if (searchColumn === "TP") {
      return ((client.mobile && client.mobile[0]) || "").includes(
        searchTerm.toLowerCase()
      );
    }
    return true;
  });

  return (
    <div className={styles.table_container_2}>
      <table className={styles.tech_table}>
        <thead>
          <tr>
            <th>
              Company Name{" "}
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.companyName || ""}</td>
              <td>{client.email || ""}</td>
              <td>{client.address || ""}</td>
              <td>{(client.mobile && client.mobile[0]) || ""}</td>
              <td>
                <button
                  className={styles.btn + " " + styles.editBtn}
                  onClick={() => {
                    clientEdit(client);
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
                    handleDelete(client.id);
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
    </div>
  );
};

export default ClientsTable;
