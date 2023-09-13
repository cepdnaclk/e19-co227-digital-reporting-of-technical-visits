import { Navigation } from "../Components/NavigationTemplate/Navigation";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import UserCard from "../Components/UserCard";
import "../Styles/Technicians.scss";
import { TechniciansTable } from "../Components/Technicians/TechniciansTable";

export const Technician = () => {
  const [technicians, setData] = useState([]);

  const technicianCollectionRef = collection(db,"Technicians")

  useEffect(()=>{


    const getTechnicians = async () =>{
        const data =  await getDocs(technicianCollectionRef);
        setData(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    getTechnicians();




  },[])

 



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
        <div className="title">
          <p>Technician Log</p>
        </div>
        
        <div className="table-container">
        {technicians.length > 0 ? (
      <TechniciansTable technicians={technicians} />
    ) : (
      <p>Loading technicians...</p>
    )}
        </div>
      </div>
    </div>
  );
};
