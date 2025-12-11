
import React from "react"
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/LoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import AddMemberPage from "./pages/AddMemberPage";
import EditMemberPage from "./pages/EditMemberPage";
import AdminMemberPage from "./pages/AdminMemberPage";
import PublicMemberPage from "./pages/PublicMemberPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ScheduleEventPage from "./pages/ScheduleEventPage";
import PublicCalendarPage from "./pages/PublicCalendarPage";
import MarkAttendancePage from "./pages/MarkAttendancePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/members' element={<PublicMemberPage />} />
        <Route path='/events' element={<PublicCalendarPage />} />
        <Route path='/admin-home' element={
          <ProtectedRoute allowedRole="Admin">
            <AdminHomePage />
          </ProtectedRoute>
        } />
        <Route path='/admin-members' element={
          <ProtectedRoute allowedRole="Admin">
            <AdminMemberPage />
          </ProtectedRoute>
        } />
        <Route path='/add-member' element={
          <ProtectedRoute allowedRole="Admin">
            <AddMemberPage />
          </ProtectedRoute>
        } />
        <Route path='/edit/:id' element={
          <ProtectedRoute allowedRole="Admin">
            <EditMemberPage />
          </ProtectedRoute>
        } />
        <Route path='/schedule-events' element={
          <ProtectedRoute allowedRole="Admin">
            <ScheduleEventPage />
          </ProtectedRoute>
        } />
        <Route path='/mark-attendance' element={
          <ProtectedRoute allowedRole="Admin">
            <MarkAttendancePage />
          </ProtectedRoute>
        } />
        
      </Routes>
    </div>
  );
}

export default App;