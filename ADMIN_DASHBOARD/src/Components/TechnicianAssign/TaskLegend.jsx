import React from 'react';
import styles from '../../Styles/TechnicianAssign/TaskLegend.module.scss';

const TaskLegend = () => {
  return (
    <div className={styles.legend}>
      <h1 className={styles['legend-title']}>Table Legend</h1>
      <span className={styles['legend-item']}>
        <div className={styles['legend-color']}style={{ backgroundColor: 'green' }}></div>
        <div className={styles['legend-text']} >Verified</div>
      </span>
      <span className={styles['legend-item']}>
      <div className={styles['legend-color']}style={{ backgroundColor: 'blue' }}></div>
        <div className={styles['legend-text']} >Completed</div>
      </span>
      <span className={styles['legend-item']}>
      <div className={styles['legend-color']}style={{ backgroundColor: 'orange' }}></div>
        <div className={styles['legend-text']} >Arrived</div>
      </span>
      <span className={styles['legend-item']}>
      <div className={styles['legend-color']}style={{ backgroundColor: 'red' }}></div>
        <div className={styles['legend-text']} >Not Arrived</div>
      </span>
    </div>
  );
};

export default TaskLegend;
