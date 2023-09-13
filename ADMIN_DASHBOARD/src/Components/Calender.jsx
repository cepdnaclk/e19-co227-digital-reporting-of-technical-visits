import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../Utilities/calender";
import cn from "../Utilities/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "../Styles/Calender.scss"

export default function Calendar() {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
	return (
		<div className="calender-container">
			<div className="calender-boarder">
				<div className="inside-container">
					<h1 className="calender-header-1">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="calender-header-2">
						<GrFormPrevious
							className="move-back"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className="today-button"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Today
						</h1>
						<GrFormNext
							className="move-forward"
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className="week-days">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="day-text"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className="month-days">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="day-text-row"
								>
									<h1
										className={cn(
											currentMonth ? "" : "current-month",
											today
												? "today"
												: "",
											selectDate
												.toDate()
												.toDateString() ===
												date.toDate().toDateString()
												? "select-date"
												: "",
											"normal-day"
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
			<div className="shedule-boarder">
				<h1 className="shedule-header">
					Schedules for {selectDate.toDate().toDateString()}
				</h1>
				<p className="meetings">No Sheduled Jobs for today.</p>
			</div>
		</div>
	);
}