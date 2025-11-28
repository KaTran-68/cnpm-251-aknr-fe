import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TutorSelection from "../pages/TutorSelection/TutorSelection";
import ScheduleView from "../pages/ScheduleView/ScheduleView";
// Updated import to match your renamed file
import RegisterSchedule from "../pages/RegisterSchedule_SV/RegisterSchedule_SV";

/**
 * AppRoutes - demo routes
 *
 * Root (/) -> /spaces (ScheduleView)
 * /spaces -> ScheduleView (register button navigates to /register-schedule)
 * /register-schedule -> RegisterSchedule page (the new screen)
 * /tutor-selection -> TutorSelection demo
 */

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/spaces" replace />} />
        <Route path="/spaces" element={<ScheduleView />} />
        <Route path="/register-schedule" element={<RegisterSchedule />} />
        <Route path="/tutor-selection" element={<TutorSelection />} />
        <Route path="*" element={<Navigate to="/spaces" replace />} />
      </Routes>
    </Router>
  );
}
