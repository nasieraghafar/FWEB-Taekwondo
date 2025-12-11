import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import BackgroundSection from "../components/BackgroundSection";
import Edit from "../components/EditMemberCard";

const EditMemberPage = () => {
    return (
        <div>
            {/* Navbar */}
            <AdminNavbar />

            {/* Background Section */}
            <BackgroundSection>
                <Edit />
            </BackgroundSection>
        </div>
    );
};

export default EditMemberPage;
