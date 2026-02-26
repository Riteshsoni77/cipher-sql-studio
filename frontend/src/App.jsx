import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import AttemptAssignments from "./pages/AttemptAssignments";
import Assignments from "./pages/assignments";

function App() {
  return (
    <div>

   
    <Router>
      <Routes>
           <Route path="/" element={<Navigate to="/assignments" />} />
          <Route path="/assignments" element={<Assignments />} />
        <Route path="/attempt-assignment/:assignmentId" element={<AttemptAssignments />} />
      </Routes>
    </Router>
     </div>
  );
}

export default App;
