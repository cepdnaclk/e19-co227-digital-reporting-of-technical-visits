import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../Utilities/calender";
import cn from "../Utilities/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "../Styles/Calender.module.scss";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
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
                  <h1
                    className={cn(
                      currentMonth ? "" : styles.current_month,
                      today ? styles.today : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? styles.select_date
                        : "",
                      styles.normal_day
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
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
        <p className={styles.meetings}>No Sheduled Jobs for today.</p>
      </div>
    </div>
  );
}
