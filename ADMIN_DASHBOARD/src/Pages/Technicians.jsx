
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs ,onSnapshot} from "firebase/firestore";
import { Navigation } from "../Components/Navigation/Navigation";

import UserCard from "../Components/UserCard";
import { TechniciansTable } from "../Components/Technicians/TechniciansTable";
import { TechnicianForm } from "../Components/Technicians/TechnicianForm";
import "../Styles/Technicians.scss"; // Import your SCSS stylesheet

export const Technician = () => {
  const [technicians, setTechnicians] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");

  useEffect(() => {
     // Create a reference to the Firestore collection
  const technicianCollectionRef = collection(db, 'Technicians');
    

    // Set up a Firestore listener for real-time updates
    const unsubscribe = onSnapshot(technicianCollectionRef, (snapshot) => {
      const updatedTechnicians = [];
      snapshot.forEach((doc) => {
        updatedTechnicians.push({ ...doc.data(), id: doc.id });
      });
      setTechnicians(updatedTechnicians);
    });


    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();

    };
  }, []); // The empty dependency array ensures this effect runs only once

    const createTechnician = async () =>{

    }

    const closeForm = ()=>{
      setShowForm(false);
    }

  

  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        
        <div className="component-container">

          <div className="title">
            <p>Technician Log</p>
          </div>
          <div>
            {!showForm && <button onClick={()=>setShowForm(true)}>Add New Technician</button>}

          {showForm && <TechnicianForm onClosing={closeForm}/>}
        </div>
          <div className="table-container">
            
            <input
        type="text"
        placeholder="Search Technicians..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
            <button className="search-button">Search</button>
            {technicians.length > 0 ? (
              <TechniciansTable technicians={technicians} searchTerm={searchTerm}/>
            ) : (
              <p>Loading technicians...</p>
            )}
          </div>

          
        </div>
        
      </div>
    </div>
  );
};
