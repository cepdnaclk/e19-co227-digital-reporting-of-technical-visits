import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "../Styles/Notification.module.scss";

library.add(faBell);

const Notification = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, body: "Notification 1", isRead: false },
    { id: 2, body: "Notification 2", isRead: true },
    { id: 3, body: "Notification 3", isRead: false },
  ]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNotificationClick = (notificationId) => {
    const clickedNotification = notifications.find(
      (notification) => notification.id === notificationId
    );

    console.log(`Clicked notification: ${JSON.stringify(clickedNotification)}`);

    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
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
