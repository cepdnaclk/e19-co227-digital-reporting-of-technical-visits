import Calendar from "../Components/Calender";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import styles from  "../Styles/Dashboard.module.scss";

export const Dashboard = () => {
  return (
    <div>
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <div className={styles.component_container}>
          {/* <div className="name">
            <p>Dashboard Page</p>
          </div> */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};
