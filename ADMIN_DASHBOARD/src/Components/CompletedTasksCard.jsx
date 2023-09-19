import React from "react";
import styles from "../Styles/CompletedTasksCard.module.scss";

const CompletedTasksCard = () => {
  return (
    <div className={styles.completedTasksCard}>
      <h1>Completed Tasks</h1>
      <div className={styles.centeredNumber}>0</div>
    </div>
  );
};

export default CompletedTasksCard;
