import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ClassDashboard from "../pages/Student/ClassDashboard/ClassDashboard";
import QuizTake from "../pages/Student/QuizTake/QuizTake";
import ClassManager from "../pages/Tutor/ClassManager/ClassManager";
import QuizCreate from "../pages/Tutor/QuizCreate/QuizCreate";
import TutorRegistration from "../pages/TutorRegistration/TutorRegistration";
import SubmittedProfiles from "../pages/SubmittedProfiles/SubmittedProfiles";
import TutorSelection from "../pages/TutorSelection/TutorSelection";
import ScheduleView from "../pages/ScheduleView/ScheduleView";
import RegisterScheduleSV from "../pages/RegisterSchedule_SV/RegisterSchedule_SV";
import TutorList from "../pages/TutorManagement/TutorList";
import ClassList from "../pages/ClassManagement/ClassList";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path=":role/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path=":role/account" element={<PrivateRoute><AccountDashboard /></PrivateRoute>} />
        <Route path=":role/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path=":role/register" element={<PrivateRoute><RegisterSchedule /></PrivateRoute>} />
        <Route path="tutor/view" element={<PrivateRoute><ViewSchedule /></PrivateRoute>} />
        <Route path="tutor/confirm" element={<PrivateRoute><ConfirmSchedule /></PrivateRoute>} />
        <Route path="tutor/students" element={<PrivateRoute><StudentList /></PrivateRoute>} />
        <Route path="/class" element={<PrivateRoute><ClassDashboard /></PrivateRoute>} />
        <Route path="/class/quiz/:quizId" element={<PrivateRoute><QuizTake /></PrivateRoute>} />
        <Route path="/class/tutor" element={<PrivateRoute><ClassManager /></PrivateRoute>} />
        <Route path="/class/tutor/create-quiz" element={<PrivateRoute><QuizCreate /></PrivateRoute>} />
        <Route path="/tutor-registration" element={<PrivateRoute><TutorRegistration /></PrivateRoute>} />
        <Route path="/submitted-profiles" element={<PrivateRoute><SubmittedProfiles /></PrivateRoute>} />
        <Route path="/tutor-selection" element={<PrivateRoute><TutorSelection /></PrivateRoute>} />
        <Route path="/spaces" element={<PrivateRoute><ScheduleView /></PrivateRoute>} />
        <Route path="/register-schedule-sv" element={<PrivateRoute><RegisterScheduleSV /></PrivateRoute>} />
        <Route path="/tutor-list" element={<PrivateRoute><TutorList /></PrivateRoute>} />
        <Route path="/class-list" element={<PrivateRoute><ClassList /></PrivateRoute>} />

        {/* <Route path="*" element={<Navigate to="/spaces" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
