import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Assignments.scss";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/assignments"); // API call
        setAssignments(response.data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchAssignments();
  }, []); 

 
  const handleNavigate = (assignmentId) => {
    navigate(`/attempt-assignment/${assignmentId}`);
  };

  
  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  
  return (
    <div className="assignments-container">
        <h1 style={{ textAlign: "center" }}>The SQL Assignment</h1>
      
      <div className="assignments-list">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div className="assignment-card" key={assignment._id}>
              <h2 className="assignment-title">{assignment.title}</h2>
              <p className="assignment-description">{assignment.description}</p>
              <p className="assignment-difficulty">
                <strong>Difficulty:</strong> {assignment.difficulty}
              </p>
              <button
                className="navigate-button"
                onClick={() => handleNavigate(assignment._id)}
              >
                Attempt Assignment
              </button>
            </div>
          ))
        ) : (
          <div className="no-assignments">No assignments available.</div>
        )}
      </div>
    </div>
  );
};

export default Assignments;