import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../Styles/Clients/ClientForm.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import classNames from "classnames";
import {FiCheckCircle } from "react-icons/fi";

export const ClientForm = ({ onClosing }) => {
  const clientCollectionRef = collection(db, "Clients");

  const [formData, setFormData] = useState({
    companyName: "",
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
      companyName: "",
      email: "",
      address: "",
      mobile: [""],
    });
  };


  const onSubmit = async (data) => {
    await addDoc(clientCollectionRef, data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.topic_container}>
        <h2 className={styles.topic}>Add a Client</h2>
      </div>

      <button
        className={styles.close_button}
        onClick={(e) => {
          e.preventDefault();
          onClosing();
        }}
      >
        X
      </button>
      <div className={styles.company_name}>
        <div className="icon">
          <BsFillPersonFill />
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
        <button type="submit">Add Client</button>
      </div>
      <div
          className={classNames(
            styles.feedbackContainer,
            showFeedbackSuccess && styles.show
          )}
        >
          <FiCheckCircle className={styles.feedbackIcon} />
          <p>Client Added Successfully!</p>
        </div>
    </form>
  );
};
