import React from "react";
import BackgroundSection from "../components/BackgroundSection";
import AdminNavbar from "../components/AdminNavbar";
import AdminEventCalendar from "../components/ScheduleEvents";

const ScheduleEventPage = () => {
  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      <AdminEventCalendar />
    </div>
  );
};

export default ScheduleEventPage;
