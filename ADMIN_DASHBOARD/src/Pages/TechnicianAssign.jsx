import { Navigation } from "../Components/Navigation/Navigation";
import LabSlots from "../Components/TechnicianAssign/LabSlots/LabSlots";
import UserCard from "../Components/UserCard";
import styles from "../Styles/TechniciansAssign.module.scss";

export const TechnicianAssign = () => {
  return (
    <div>
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <div className={styles.component_container}>
          <div className={styles.name}>
            <p>Technician Assign</p>
          </div>
        </div>
      </div>
    </div>
  );
};
