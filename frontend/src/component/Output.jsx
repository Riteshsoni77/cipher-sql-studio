import React from "react";
import "./Output.scss";

const Output = ({ queryResult }) => {
  return (
    <div className="output-container">
      <h2>Output</h2>
      {queryResult ? (
        Array.isArray(queryResult) ? (
          queryResult.length > 0 ? (
            <table className="output-table">
              <thead>
                <tr>
                  {Object.keys(queryResult[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data found.</p>
          )
        ) : (
          <p className="output-error">{queryResult.error}</p>
        )
      ) : (
        <p>No output yet. Run a query to see results.</p>
      )}
    </div>
  );
};

export default Output;