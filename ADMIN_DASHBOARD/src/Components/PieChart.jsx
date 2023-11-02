import React, { useContext, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { DataContext } from "../Context/dataContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { jobs, technicians } = useContext(DataContext);

  const countTasksByTechnician = (tasks) => {
    const taskCounts = {};
    console.log(tasks);
    tasks.forEach((task) => {
      if (taskCounts[task.email]) {
        taskCounts[task.email]++;
      } else {
        taskCounts[task.email] = 1;
      }
    });
    console.log(taskCounts);
    return taskCounts;
  };

  const taskCounts = countTasksByTechnician(jobs);
  const data = {
    labels: technicians.map((tech) => tech.firstName + " " + tech.lastName),
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: "# of Tasks",
        data: technicians.map((tech) => taskCounts[tech.email] || 0),
        // data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(218, 44, 82, 0.65)',
          'rgba(19, 120, 187, 0.65)',
          'rgba(220, 165, 26, 0.65)',
          'rgba(75, 192, 192, 0.65)',
          'rgba(116, 64, 219, 0.65)',
          'rgba(215, 131, 47, 0.65)',
          'rgba(42, 87, 141, 0.65)',
          'rgba(240, 98, 146, 0.65)',
          'rgba(127, 205, 205, 0.65)',
          'rgba(150, 82, 206, 0.65)',
          'rgba(224, 140, 42, 0.65)',
          'rgba(94, 170, 234, 0.65)',
          'rgba(132, 196, 118, 0.65)',
          'rgba(211, 80, 141, 0.65)',
          'rgba(36, 189, 129, 0.65)',
          'rgba(185, 155, 232, 0.65)'
        ],
        borderColor: [
          'rgba(218, 44, 82, 0.65)',
          'rgba(19, 120, 187, 0.65)',
          'rgba(220, 165, 26, 0.65)',
          'rgba(75, 192, 192, 0.65)',
          'rgba(116, 64, 219, 0.65)',
          'rgba(215, 131, 47, 0.65)',
          'rgba(42, 87, 141, 0.65)',
          'rgba(240, 98, 146, 0.65)',
          'rgba(127, 205, 205, 0.65)',
          'rgba(150, 82, 206, 0.65)',
          'rgba(224, 140, 42, 0.65)',
          'rgba(94, 170, 234, 0.65)',
          'rgba(132, 196, 118, 0.65)',
          'rgba(211, 80, 141, 0.65)',
          'rgba(36, 189, 129, 0.65)',
          'rgba(185, 155, 232, 0.65)'
        ],
        borderWidth: 1, // Customize as needed
      },
    ],
  };

  return <Pie data={data} />;
}
