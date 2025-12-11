import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import RecordList from "../components/AdminMembers";
import "../App.css";
import backgroundImage from '../images/taekwondo_background.jpg';

const AdminMemberPage = () => {
    const pageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1,
    };

    const contentStyle = {
        position: "relative",
        zIndex: 2,
    };

    return (
        <div style={pageStyle}>
            <div style={overlayStyle}></div> {/* Dark overlay */}
            <div style={contentStyle}>
                <AdminNavbar />
                <div className="content">
                    <RecordList />
                </div>
            </div>
        </div>
    );
};

export default AdminMemberPage;


