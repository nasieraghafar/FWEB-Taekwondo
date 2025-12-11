import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminDashboard from "../components/AdminDashboard";
import BackgroundSection from "../components/BackgroundSection";

const AdminHomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Background Section */}
      <BackgroundSection>
        {/* Dashboard Content */}
        <AdminDashboard />
      </BackgroundSection>
    </div>
  );
};

export default AdminHomePage;
