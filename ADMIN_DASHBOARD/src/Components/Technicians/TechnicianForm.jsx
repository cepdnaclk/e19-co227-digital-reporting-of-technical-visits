import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "../../Styles/Technicians/TechnicianForm.scss"
export const TechnicianForm = ({onClosing}) => {
  const technicianCollectionRef = collection(db, "Technicians");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobile: [""], // Initialize as an empty array
  });

  const handleChange = (e, index) => {
    
    const { name, value } = e.target;
    console.log(name)
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
    // You can perform validation here if needed

    // Call the onSubmit callback with the form data
    await onSubmit(formData);
    onClosing();

    // Reset the form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      mobile: [""], // Reset to an empty array
    });
    
  };

  const onSubmit = async (data) => {
    console.log(data);
    await addDoc(technicianCollectionRef, data);
  };

  return (

    <form onSubmit={handleSubmit} className="card">
        <button onClick={()=>onClosing()}>X</button>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleChange(e, 0)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => handleChange(e, 1)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e, 2)}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={(e) => handleChange(e, 3)}
          required
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile Numbers:</label>
        {formData.mobile.map((mobileNumber, index) => (
          <div key={index}>
            <input
              type="text"
              name="mobile"
              value={mobileNumber}
              onChange={(e) => handleChange(e, index)}
              placeholder="Mobile Number"
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
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
