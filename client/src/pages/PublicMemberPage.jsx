import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import RecordList from "../components/PublicMembers";
import backgroundImage from '../images/taekwondo_background.jpg';

const PublicMemberPage = () => {
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
                <PublicNavbar />
                <div className="content">
                    <RecordList />
                </div>
            </div>
        </div>
    );
};

export default PublicMemberPage;
