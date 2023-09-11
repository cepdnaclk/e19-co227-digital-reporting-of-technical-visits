import { Navigation } from "../Components/NavigationTemplate/Navigation";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import UserCard from "../Components/UserCard";
import "../Styles/Clients.scss";

export const Technician = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const citiesRef = collection(db, "Technicians");
      console.log(citiesRef);
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="name">
          <p>Technicians Page</p>
        </div>
      </div>
    </div>
  );
};
