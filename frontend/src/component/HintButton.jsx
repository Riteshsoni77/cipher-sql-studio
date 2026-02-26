import React, { useState } from "react";
import axios from "axios";
import "./HintButton.scss";

const HintButton = ({ question }) => {
  const [hints, setHints] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getHints = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/llm/hint", {
        question,
      });
      setHints(response.data.hints);
      setIsPopupOpen(true); 
    } catch (error) {
      console.error("Error fetching hints:", error);
      setHints(["Failed to fetch hints. Please try again."]);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="hint-container">
      <button className="hint-button" onClick={getHints}>
        Get Hints
      </button>

      {isPopupOpen && (
        <div className="hint-popup">
          <div className="hint-popup-content">
            <span className="close-popup" onClick={closePopup}>
              &times;
            </span>
            <h3>Hints</h3>
            <ul>
              {hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HintButton;