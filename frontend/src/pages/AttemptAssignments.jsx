import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SqlEditor from "../component/SqlEditor.jsx";
import Output from "../component/Output.jsx"; 
import HintButton from "../component/HintButton";
import "./AttemptAssignments.scss";

const AttemptAssignments = () => {
  const { assignmentId } = useParams(); 
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sqlQuery, setSqlQuery] = useState(""); 
  const [queryResult, setQueryResult] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/assignments/${assignmentId}`);
        setAssignment(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleSqlChange = (value) => {
    setSqlQuery(value); 
  };

  const handleRunQuery = async () => {
    if (!sqlQuery.trim()) {
      setQueryResult({ error: "Query cannot be empty." });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/execute-query", {
        schemaName: `workspace_assignment1`, 
        query: sqlQuery, 
      });
      setQueryResult(response.data.rows); 
    } catch (err) {
      setQueryResult({ error: err.response?.data?.error || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading assignment...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const assignmentQuestion = assignment?.question || "No question provided";

  return (
    <div className="attempt">
      
      <h1 className="attempt__title">{assignment.title}</h1>
      <div className="attempt__layout">

        {/* LEFT PANEL */}
        <div className="attempt__left">
           <HintButton assignmentId={assignmentId} question={assignmentQuestion} />
          <p className="attempt__description">{assignment.description}</p>

          <h2 className="attempt__section-title">Question</h2>
          <p>{assignment.question}</p>

          <h2 className="attempt__section-title">Sample Tables</h2>

          {assignment.sampleTables.map((table, index) => (
            <div key={index} className="attempt__table">
              <h3>Table: {table.tableName}</h3>

              <table className="attempt__data-table">
                <thead>
                  <tr>
                    {table.columns.map((column, i) => (
                      <th key={i}>{column.columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {table.columns.map((column, colIndex) => (
                        <td key={colIndex}>
                          {row[column.columnName]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="attempt__right">
          <h2>SQL Editor</h2>
          <SqlEditor value={sqlQuery} onChange={handleSqlChange} />

          <button
            onClick={handleRunQuery}
            className="attempt__run-btn"
          >
            {isLoading ? "Running..." : "Run Query"}
          </button>

          {/* Output Component */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Output queryResult={queryResult} />
          )}
        </div>

      </div>
      
    </div>
  );
};

export default AttemptAssignments;