import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../Styles/Clients/ClientForm.module.scss";
import { BsFillFileEarmarkPersonFill, BsTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

export const ClientEditForm = ({ client, onClosing }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    address: "",
    mobile: [""],
  });

  useEffect(() => {
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
    await onUpdate(formData);
    onClosing();
  };

  const onUpdate = async (data) => {
    await updateDoc(doc(db, "clients", client.id), data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.topic_container}>
        <h2 className={styles.topic}>Edit Client Details</h2>
      </div>
      <button className={styles.close_button} onClick={() => onClosing()}>
        X
      </button>
      <div className={styles.first_name}>
        <div className="icon">
          <BsFillFileEarmarkPersonFill />
        </div>
        <div className={styles.first_name_input}>
          <label htmlFor="firstName">Company Name </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange(e, 0)}
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
            onChange={(e) => handleChange(e, 2)}
            required
          />
        </div>
      </div>
      <div className={styles.address}>
        <div className="icon">
          <GoLocation />
        </div>
        <div>
          <label htmlFor="address">Address&emsp;&ensp;</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e, 3)}
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
                type="text"
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

export default ClientEditForm;
