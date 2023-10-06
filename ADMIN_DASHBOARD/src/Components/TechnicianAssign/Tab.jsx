import React from 'react';
import styles from "../../Styles/TechnicianAssign/Tab.module.scss";

const Tab = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={styles.tab_container}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tab;
