import React, { useContext, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { DataContext } from "../Context/dataContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart () {
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
          ],
          borderColor: [
            'rgba(218, 44, 82, 1)',
            'rgba(19, 120, 187, 1)',
            'rgba(220, 165, 26, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(116, 64, 219, 1)',
            'rgba(215, 131, 47, 1)',
          ],
          borderWidth: 1, // Customize as needed
      },
    ],
  };

  return <Pie data={data} />;
};
