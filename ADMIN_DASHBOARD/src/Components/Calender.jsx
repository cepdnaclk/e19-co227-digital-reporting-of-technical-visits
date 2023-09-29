import dayjs from "dayjs";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "../Utilities/calender";
import cn from "../Utilities/cn";
import { timeTo12Hour } from "../Utilities/dateTime";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { GoTasklist, GoLocation } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import styles from "../Styles/Calender.module.scss";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const technicianCollectionRef = collection(db, "Tasks");

    const unsubscribe = onSnapshot(technicianCollectionRef, (snapshot) => {
      const updatedTasks = [];
      snapshot.forEach((doc) => {
        updatedTasks.push({ ...doc.data(), id: doc.id });
      });
      setTasks(updatedTasks);
      const filteredTasks = updatedTasks.filter(
        (tasks) =>
          tasks.startDate.toDate().toDateString() ==
          selectDate.toDate().toDateString()
      );
      // console.log(updatedTasks);
      setFilteredTasks(filteredTasks);
    });

    return () => {
      unsubscribe();
    };
  }, [selectDate]);

  const handleDateClick = (date) => {
    setSelectDate(date);
  };

  return (
    <div className={styles.calender_container}>
      <div className={styles.calender_boarder}>
        <div className={styles.inside_container}>
          <h1 className={styles.calender_header_1}>
            {months[today.month()]}, {today.year()}
          </h1>
          <div className={styles.calender_header_2}>
            <GrFormPrevious
              className={styles.move_back}
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className={styles.today_button}
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className={styles.move_forward}
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className={styles.week_days}>
          {days.map((day, index) => {
            return (
              <h1 key={index} className={styles.day_text}>
                {day}
              </h1>
            );
          })}
        </div>

        <div className={styles.month_days}>
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div key={index} className={styles.day_text_row}>
                  <button
                    className={cn(
                      currentMonth ? "" : styles.current_month,
                      today ? styles.today : "",
                      tasks.some(
                        (tasks) =>
                          tasks.startDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                      )
                        ? styles.task_date
                        : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? styles.select_date
                        : "",
                      styles.normal_day
                    )}
                    onClick={() => handleDateClick(date)}
                  >
                    {date.date()}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className={styles.shedule_boarder}>
        <h1 className={styles.shedule_header}>
          Schedules for {selectDate.toDate().toDateString()}
        </h1>

        <div className={styles.meeting_container}>
          {filteredTasks.length > 0 ? (
            tasks.map((task) => {
              if (
                task.startDate.toDate().toDateString() ===
                selectDate.toDate().toDateString()
              ) {
                return (
                  <div key={task.id} className={styles.shedule_container}>
                    <p className={styles.meetings_data}>
                      <GoLocation />
                      &emsp;{task.company}
                    </p>
                    <p className={styles.meetings_data}>
                      <GoTasklist />
                      &emsp;{task.title}
                    </p>
                    <p className={styles.meetings_data}>
                      <MdAccessTime />
                      &emsp;
                      {task.startDate.toDate().toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true, // Use 12-hour format
                      })}
                    </p>
                  </div>
                );
              }
            })
          ) : (
            <p className={styles.meetings}>No Sheduled Jobs for today.</p>
          )}
        </div>
      </div>
    </div>
  );
}
