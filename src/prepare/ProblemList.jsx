
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProblemList.css'; // Import CSS file for styling

function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems(); // Call the fetchProblems function when the component mounts
  }, []);

  const fetchProblems = () => {
    fetch('http://localhost:8000/api/v1/get_problem_list/')
      .then(response => response.json())
      .then(data => {
        // Access the "data" key to get the array of problems
        setProblems(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>Your Preparation</h1>
      </div>

      {/* Problem list */}
      <div className="problem-list">
        {/* Map through problems and create clickable items */}
        {problems.map(problem => (
          <div key={problem.problem_id} className="problem-item">
            <div className="problem-content">
              <h2>{problem.title_en}</h2>
              <p>{problem.description_en}</p>
              <p>Difficulty: {problem.difficulty}</p>
              <button className="solve-button">Solve Problem</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemList;
