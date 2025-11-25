import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassDashboard from "../pages/Student/ClassDashboard/ClassDashboard";
import QuizTake from "../pages/Student/QuizTake/QuizTake";
import ClassManager from "../pages/Tutor/ClassManager/ClassManager";
import QuizCreate from "../pages/Tutor/QuizCreate/QuizCreate";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClassDashboard />} />
        <Route path="/quiz/:quizId" element={<QuizTake />} />             
        <Route path="/tutor" element={<ClassManager />} />
        <Route path="/tutor/create-quiz" element={<QuizCreate />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;