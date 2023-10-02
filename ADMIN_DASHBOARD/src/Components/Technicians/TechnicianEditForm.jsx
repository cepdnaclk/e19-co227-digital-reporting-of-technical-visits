import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../Styles/Technicians/TechnicianForm.module.scss";
import {
  BsFillFileEarmarkPersonFill,
  BsFileEarmarkPerson,
  BsTelephoneFill,
} from "react-icons/bs";
import classNames from "classnames";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdError, MdPlaylistAddCheckCircle } from "react-icons/md";
export const TechnicianEditForm = ({ technician, onClosing }) => {
  const technicianCollectionRef = collection(db, "Technicians");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobile: [""],
  });

  useEffect(() => {
    // Populate the form with the technician's data when it's available
    if (technician) {
      setFormData({
        firstName: technician.firstName || "",
        lastName: technician.lastName || "",
        email: technician.email || "",
        address: technician.address || "",
        mobile: technician.mobile || [""],
      });
    }
    console.log(formData.mobile);
  }, [technician]);

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

  const handleAddMobile = (e) => {
    e.preventDefault()
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

  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the technician's data in the database
    await onUpdate(formData);
    setShowFeedbackSuccess(true);
    setTimeout(() => {
      setShowFeedbackSuccess(false);
      onClosing();
    }, 2000);
  };

  const onUpdate = async (data) => {
    console.log(data);
    // Update the document in Firestore
    await updateDoc(doc(technicianCollectionRef, technician.id), data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.topic_container}>
        <h2 className={styles.topic}>Edit Technician Details</h2>
      </div>
      <button className={styles.close_button} onClick={() => onClosing()}>
        X
      </button>
      <div className={styles.first_name}>
        <div className="icon">
          <BsFillFileEarmarkPersonFill />
        </div>
        <div className={styles.first_name_input}>
          <label htmlFor="firstName">First Name </label>
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

      <div className={styles.last_name}>
        <div className="icon">
          <BsFileEarmarkPerson />
        </div>
        <div className={styles.first_name_input}>
          <label htmlFor="lastName">Last Name </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange(e, 1)}
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
                type="number"
                name="mobile"
                value={mobileNumber}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {index > 0 && (
                <button type="Remove" onClick={() => handleRemoveMobile(index)}>
                  Remove
                </button>
              )}
              {index == 0 && <button type="fill">fill text</button>}
            </div>
          ))}
          <button type="mobile" onClick={handleAddMobile}>
            Add Mobile Number
          </button>
        </div>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
      <div
        className={classNames(
          styles.feedbackContainer,
          styles.feedbackWaiting,
          showFeedbackSuccess && styles.show
        )}
      >
        <MdPlaylistAddCheckCircle className={styles.feedbackIcon} />
        <p>Technician Was Edited!</p>
      </div>
    </form>
  );
};
