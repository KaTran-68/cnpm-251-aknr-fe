import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageClass from "../pages/Home/ManageClass";
import QuizTake from "../pages/Quiz/QuizTake";
import ManageClassTutor from "../pages/Tutor/ManageClassTutor";
import QuizCreate from "../pages/Tutor/QuizCreate";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManageClass />} />
        <Route path="/quiz/:quizId" element={<QuizTake />} />             
        <Route path="/tutor" element={<ManageClassTutor />} />
        <Route path="/tutor/create-quiz" element={<QuizCreate />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;