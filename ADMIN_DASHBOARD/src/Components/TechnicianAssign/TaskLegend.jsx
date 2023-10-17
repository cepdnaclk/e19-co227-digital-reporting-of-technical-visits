import React from 'react';
import styles from '../../Styles/TechnicianAssign/TaskLegend.module.scss';

const TaskLegend = () => {
  return (
    <div className={styles.legend}>
      <h1 className={styles['legend-title']}>Table Legend</h1>
      <span className={styles['legend-item']}>
        <div className={styles['legend-color']}style={{ backgroundColor: 'rgba(20, 100, 30, 0.7)' }}></div>
        <div className={styles['legend-text']} >Verified</div>
      </span>
      <span className={styles['legend-item']}>
      <div className={styles['legend-color']}style={{ backgroundColor: 'rgba(3, 26, 66, 0.8)' }}></div>
        <div className={styles['legend-text']} >Completed</div>
      </span>
      <span className={styles['legend-item']}>
      <div className={styles['legend-color']}style={{ backgroundColor: 'rgba(200,160,50, 0.8)' }}></div>
        <div className={styles['legend-text']} >Arrived</div>
      </span>
      <span className={styles['legend-item']}>
      <div className={styles['legend-color']}style={{ backgroundColor: 'rgba(200,40,50, 0.8)' }}></div>
        <div className={styles['legend-text']} >Not Arrived</div>
      </span>
    </div>
  );
};

export default TaskLegend;
