import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import '../AboutPage.css';
import taekwondoImage from '../images/Taekwondo_2.jpg';

const AboutPage = () => {
    return (
        <div>
            <PublicNavbar />

            {/* About Us Section */}
            <div className="about-container">
                <div className="about-header">
                    <h2>About Us</h2>
                </div>
                <br></br>

                {/* Flexbox layout for the image and content */}
                <div className="about-content">
                    <div className="about-image">
                        <img
                            src={taekwondoImage}  // Reference the imported image
                            alt="Taekwondo Team"
                            className="about-img"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            Taekwondo is the oldest Korean martial art and is still included in the Korean military training today.
                            Taekwondo competitions involve poomsae, a set of defined pattern defence and attack techniques, and kyurugi,
                            which involves sparring with an opponent. TP Taekwondo Team competes in the Polytechnic-ITE Games and external competitions.
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AboutPage;
