import React from "react";
import styles from "../Styles/OngoingTasksCard.module.scss";

const OngoingTasksCard = () => {
  return (
    <div className={styles.ongoingTasksCard}>
      <h1>Ongoing Tasks</h1>
      <div className={styles.centeredNumber}>8</div>

    </div>
  );
};

export default OngoingTasksCard;
