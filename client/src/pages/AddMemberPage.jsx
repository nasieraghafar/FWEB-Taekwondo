import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import BackgroundSection from "../components/BackgroundSection";
import AddMemberCard from "../components/AddMemberCard";

const AddMemberPage = () => {
    return (
        <div>
            {/* Navbar */}
            <AdminNavbar />

            {/* Background Section */}
            <BackgroundSection>
                <AddMemberCard />
            </BackgroundSection>
        </div>
    );
};

export default AddMemberPage;
