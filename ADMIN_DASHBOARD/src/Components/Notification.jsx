import React, { useState,useContext } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "../Styles/Notification.module.scss";
import { DataContext } from "../Context/dataContext";
import { collection, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

library.add(faBell);

const Notification = () => {
  const notificationsCollectionRef = collection(db,"Notifications");
  const [showDropdown, setShowDropdown] = useState(false);
  // const [notifications, setNotifications] = useState([
  //   { id: 1, body: "Notification 1", isRead: false },
  //   { id: 2, body: "Notification 2", isRead: true },
  //   { id: 3, body: "Notification 3", isRead: false },
  // ]);
  const {notifications} = useContext(DataContext);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNotificationClick = (notificationId) => {
    const clickedNotification = notifications.find(
      (notification) => notification.id === notificationId
    );

    console.log(`Clicked notification: ${JSON.stringify(clickedNotification)}`);

      clickedNotification.isRead = true;
      updateDoc(doc(notificationsCollectionRef,clickedNotification.id),clickedNotification);
  };

  const clearNotifications = () => {
    for (const notification of notifications){
      
      notification.isRead = true;
      updateDoc(doc(notificationsCollectionRef,notification.id),notification);

    }
    
  };

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notificationIcon} onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBell} size="lg" />
        {notifications.length > 0 && (
          <span className={styles.notificationCount}>
            {notifications.length}
          </span>
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.notification_drop}>
            {notifications.map((notification, index) => (
              
              <p
                className={`${styles.notificationData} ${
                  notification.isRead ? styles.read : ""
                }`}
                key={index}
                onClick={() => handleNotificationClick(notification.id)}
              >
                {notification.body}
              </p>
            ))}
          </div>
          {notifications.length > 0 && (
            <button
              className={styles.clearNotification}
              onClick={clearNotifications}
            >
              Clear Notifications
            </button>
          )}
          {notifications.length === 0 && (
            <p className={styles.notificationDataEmpty}>
              Currently have no Notifications
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
