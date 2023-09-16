import React, { useState } from "react";
import styles from "../../Styles/Clients/ClientsTable.module.scss";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import classNames from "classnames";
import { MdCreate } from "react-icons/md";

export const ClientsTable = ({ clients, searchTerm, searchColumn }) => {
  const [sortBy, setSortBy] = useState("companyName");
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

  const sortedClients = [...clients].sort((a, b) => {
    const aValue = sortBy ? a[sortBy] : a.name;
    const bValue = sortBy ? b[sortBy] : b.name;

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredClients = sortedClients.filter((client) => {
    if (searchColumn === "companyName") {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Email") {
      return client.email.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "Address") {
      return client.address.includes(searchTerm.toLowerCase());
    } else if (searchColumn === "TP") {
      return client.mobile[0].includes(searchTerm.toLowerCase());
    }
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.companyName}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
              <td>{client.mobile[0]}</td>
              <td>
                <button className={classNames(styles.btn, styles.editBtn)}
                  // onClick={() => {
                  //   openEditForm(technician);
                  // }}
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
