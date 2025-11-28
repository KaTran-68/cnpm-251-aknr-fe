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
import ClassDashboard from "../pages/Student/ClassDashboard/ClassDashboard";
import QuizTake from "../pages/Student/QuizTake/QuizTake";
import ClassManager from "../pages/Tutor/ClassManager/ClassManager";
import QuizCreate from "../pages/Tutor/QuizCreate/QuizCreate";
import TutorRegistration from "../pages/TutorRegistration/TutorRegistration";
import SubmittedProfiles from "../pages/SubmittedProfiles/SubmittedProfiles";
import TutorSelection from "../pages/TutorSelection/TutorSelection";

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
        <Route path="/class" element={<ClassDashboard/>} />
        <Route path="/class/quiz/:quizId" element={<QuizTake />} />
        <Route path="/class/tutor" element={<ClassManager />} />
        <Route path="/class/tutor/create-quiz" element={<QuizCreate />} />
        <Route path="/TutorRegistration" element={<TutorRegistration />} />
        <Route path="/SubmittedProfiles" element={<SubmittedProfiles />} />
        <Route path="/tutor-selection" element={<TutorSelection />} />
        {/* <Route path="/" element={<Navigate to="/spaces" replace />} />
        <Route path="/spaces" element={<ScheduleView />} />
        <Route path="/register-schedule" element={<RegisterSchedule />} />
        
        <Route path="*" element={<Navigate to="/spaces" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
