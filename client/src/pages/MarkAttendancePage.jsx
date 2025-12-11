import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import MarkAttendance from "../components/MarkAttendance";

const MarkAttendancePage = () => {
  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />
      <br></br>
      <br></br>
      <MarkAttendance />
    </div>
  );
};

export default MarkAttendancePage;
