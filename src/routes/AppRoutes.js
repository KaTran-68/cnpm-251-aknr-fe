import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterSchedule from "../pages/RegisterSchedule/RegisterSchedule";
import ViewSchedule from "../pages/ViewSchedule/ViewSchedule";
import ConfirmSchedule from "../pages/ConfirmSchedule/ConfirmSchedule";
import StudentList from "../pages/StudentList/StudentList";
import RoleSelect from "../pages/RoleSelect/RoleSelect";
import LoginForm from "../pages/LoginForm/LoginForm";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AccountDashboard from "../pages/AccountDashboard/AccountDashboard";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path=":role/home" element={<Home />} />
        <Route path=":role/account" element={<AccountDashboard />} />
        <Route path=":role/change-password" element={<ChangePassword />} />
        <Route path="/register" element={<RegisterSchedule />} />
        <Route path="/view" element={<ViewSchedule />} />
        <Route path="/confirm" element={<ConfirmSchedule />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;