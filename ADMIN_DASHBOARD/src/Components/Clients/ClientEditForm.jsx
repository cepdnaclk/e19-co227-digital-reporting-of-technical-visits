import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../Styles/Clients/ClientForm.module.scss";
import {
  BsFillFileEarmarkPersonFill,
  BsFileEarmarkPerson,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

export const ClientEditForm = ({ client, onClosing }) => {
  const clientCollectionRef = collection(db, "Clients");

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    address: "",
    mobile: [""],
  });

  useEffect(() => {
    // Populate the form with the client's data when it's available
    if (client) {
      setFormData({
        companyName: client.companyName || "",
        email: client.email || "",
        address: client.address || "",
        mobile: client.mobile || [""],
      });
    }
  }, [client]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const updatedMobile = [...formData.mobile];
      updatedMobile[index] = value;

      setFormData({
        ...formData,
        mobile: updatedMobile,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddMobile = () => {
    setFormData({
      ...formData,
      mobile: [...formData.mobile, ""],
    });
  };

  const handleRemoveMobile = (index) => {
    const updatedMobile = [...formData.mobile];
    updatedMobile.splice(index, 1);

    setFormData({
      ...formData,
      mobile: updatedMobile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the client's data in the database
    await onUpdate(formData);
    onClosing();
  };

  const onUpdate = async (data) => {
    await updateDoc(doc(clientCollectionRef, client.id), data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <h2 className={styles.topic}>Edit Client</h2>
      <button className={styles.close_button} onClick={() => onClosing()}>
        X
      </button>
      <div className={styles.company_name}>
        <div className="icon">
          <BsFillFileEarmarkPersonFill />
        </div>
        <div className={styles.company_name_input}>
          <label htmlFor="companyName">Company Name </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => handleChange(e, "companyName")}
            required
          />
        </div>
      </div>

      <div className={styles.e_mail}>
        <div className="icon">
          <AiOutlineMail />
        </div>
        <div className={styles.email_input}>
          <label htmlFor="email">Email&emsp;&emsp;&ensp;</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            required
          />
        </div>
      </div>

      <div className={styles.address}>
        <div className="icon">
          <GoLocation />
        </div>
        <div className={styles.address_input}>
          <label htmlFor="address">Address&emsp;&ensp;</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e, "address")}
            required
          />
        </div>
      </div>

      <div className={styles.phone_number}>
        <div className="icon">
          <BsTelephoneFill />
        </div>
        <div className={styles.mobile_number}>
          <label htmlFor="mobile">Mobile Numbers:</label>
          {formData.mobile.map((mobileNumber, index) => (
            <div key={index}>
              <input
                type="number"
                name="mobile"
                value={mobileNumber}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveMobile(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddMobile}>
            Add Mobile Number
          </button>
        </div>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
