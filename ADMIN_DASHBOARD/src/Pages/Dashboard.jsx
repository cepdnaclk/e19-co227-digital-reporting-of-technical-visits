import Calendar from "../Components/Calender";
import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import OngoingTasksCard from "../Components/OngoingTasksCard";
import CompletedTasksCard from "../Components/CompletedTasksCard";
import styles from "../Styles/Dashboard.module.scss"

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Navigation />
      <UserCard />
      <div className={styles.component_container}>
        <Calendar />
        <div className={styles.cardContainer}>
          <OngoingTasksCard />
          <CompletedTasksCard />
        </div>
      </div>
    </div>
  );
};

