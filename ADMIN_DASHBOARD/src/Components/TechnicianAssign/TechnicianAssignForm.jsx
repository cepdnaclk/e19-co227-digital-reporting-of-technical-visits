import React, { useContext, useState } from 'react';
import { DataContext } from '../../Context/dataContext'; // Import your DataContext here

const TechnicianAssignForm = ({ technician, timeslot }) => {
  // Access the jobs from the DataContext
  const { jobs } = useContext(DataContext);
  const unassignedJobs = jobs.filter((job) => !job.email);
  console.log(unassignedJobs);

  // State to track the selected job
  const [selectedJob, setSelectedJob] = useState('');

  // Function to handle job selection
  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the selected job here
    console.log(`Technician: ${technician}, Timeslot: ${timeslot}, Job: ${selectedJob}`);
  };

  return (
    <div>
      <h2>Assign Job for Technician</h2>
      <p>
  Technician Name: {technician ? technician.firstName : 'Not selected'}
</p>
<p>
  Technician Email: {technician ? technician.email : 'Not selected'}
</p>


      <p>Timeslot: {timeslot ?  timeslot:"Not selected"}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Select Job:
          <select value={selectedJob} onChange={handleJobChange}>
            <option value="">Select a Job</option>
            {unassignedJobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Job</button>
      </form>
    </div>
  );
};

export default TechnicianAssignForm;
