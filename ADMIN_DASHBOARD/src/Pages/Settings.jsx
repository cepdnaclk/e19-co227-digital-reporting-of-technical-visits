import { Navigation } from "../Components/Navigation/Navigation";
import { TaskForm } from "../Components/Tasks/TaskForm";
import UserCard from "../Components/UserCard";
import styles from  "../Styles/Settings.module.scss";
import Notification from "../Components/Notification";

export const Settings = () => {
  return (
    <div>
      <div className={styles.container}>
        <Navigation />
        <UserCard />
        <Notification />
        <div className={styles.component_container}>
          <div className={styles.title}>
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
