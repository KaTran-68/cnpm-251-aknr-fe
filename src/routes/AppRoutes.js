import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterSchedule from "../pages/RegisterSchedule/RegisterSchedule";
import ViewSchedule from "../pages/ViewSchedule/ViewSchedule";
import ConfirmSchedule from "../pages/ConfirmSchedule/ConfirmSchedule";
import StudentList from "../pages/StudentList/StudentList";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterSchedule />} />
        <Route path="/view" element={<ViewSchedule />} />
        <Route path="/confirm" element={<ConfirmSchedule />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;