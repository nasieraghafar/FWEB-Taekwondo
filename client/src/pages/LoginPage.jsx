import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import BackgroundSection from "../components/BackgroundSection";
import LoginCard from "../components/LoginCard";

const LoginPage = () => {
  return (
    <div>
      {/* Navbar */}
      <PublicNavbar />

      {/* Background Section with Login Card */}
      <BackgroundSection>
        <LoginCard />
      </BackgroundSection>
    </div>
  );
};

export default LoginPage;
