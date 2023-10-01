import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../Styles/Technicians/TechnicianForm.module.scss";
import classNames from "classnames";
import {
  BsFillFileEarmarkPersonFill,
  BsFileEarmarkPerson,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FiMapPin, FiCheck, FiCheckCircle } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

export const TechnicianForm = ({ onClosing }) => {
  const technicianCollectionRef = collection(db, "Technicians");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobile: [""],
  });

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

  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(formData);
    setShowFeedbackSuccess(true);
    setTimeout(() => {
      setShowFeedbackSuccess(false);
      onClosing();
    }, 2000);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      mobile: [""],
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    await addDoc(technicianCollectionRef, data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.topic_container}>
          <h2 className={styles.topic}>Add a Technician</h2>
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
                  <button
                    type="Remove"
                    onClick={() => handleRemoveMobile(index)}
                  >
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
            showFeedbackSuccess && styles.show
          )}
        >
          <FiCheckCircle className={styles.feedbackIcon} />
          <p>Technician Added Successfully!</p>
        </div>
      </form>
    </>
  );
};
