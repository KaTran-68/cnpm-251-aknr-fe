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
        <Route path="/class" element={<ClassDashboard/>} />
        <Route path="/class/quiz/:quizId" element={<QuizTake />} />
        <Route path="/class/tutor" element={<ClassManager />} />
        <Route path="/class/tutor/create-quiz" element={<QuizCreate />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;