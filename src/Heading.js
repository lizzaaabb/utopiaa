import React, { useState, useEffect } from 'react';
import './Styles/Heading.css'; // Assuming Styles folder is directly in src/
import logo from './Pictures/logo2.png'; // Assuming Pictures folder is directly in src/
import Landing from './Landing'; // Assuming Landing is directly in src/
import icon1 from './Pictures/icon1.png';
import icon2 from './Pictures/icon2.png';
import icon3 from './Pictures/icon3.png';

// *** MODIFIED: Import Link from react-scroll with an alias ***
import { Link as ScrollLink } from 'react-scroll';

// *** NEW: Import Link from react-router-dom ***
import { Link } from 'react-router-dom'; // This will be the default Link for navigation

function Heading() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        document.title = "VIP Travel & Real Estate";
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className='heading-body'
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/batumiback.jpeg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1000
            }}>

            <div className="header-container">
                <div className="header1">
                    <img src={logo} alt="Utopia VIP Tourism and Real Estate Logo" className='utopia-logo' />
                </div>
                <div className="header2">
                    <div className="header2-text-container">
                        <h2>UTOPIA</h2>
                        <p>VIP Tourism & Real Estate</p>
                    </div>
                </div>
                <div className="header3">
                    <div className="contact-container">
                        <div className="forcontact">
                            {/* Use react-router-dom's Link for navigation to /tours */}
                            <Link // Changed from ScrollLink to Link
                                to="/tours" // <--- CHANGED THIS TO THE ROUTE FOR ToursApp.js
                                className='contact'
                                // Optional: You might want to close the sidebar if this link were inside it
                                // onClick={closeSidebar} // If this link *were* inside the sidebar, then onClick would be appropriate
                            >Discover Tours</Link>
                        </div>
                        <div className="formenu">
                            <div
                                className={`hamburger ${isSidebarOpen ? 'active' : ''}`}
                                id="hamburger-icon"
                                onClick={toggleSidebar}
                            >
                                <div className={`bar ${isSidebarOpen ? 'open' : ''}`}></div>
                                <div className={`bar ${isSidebarOpen ? 'open' : ''}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                {/* Close button for sidebar */}
                <div className="sidebar-close" onClick={closeSidebar}>
                    <div className="close-line"></div>
                    <div className="close-line"></div>
                </div>

                <div className="sidebar-text">
                    <h3>UTOPIA</h3>
                    <p>VIP Tourism & Real Estate</p>
                </div>

                <div className="menu-items">
                    {/* *** ALL SCROLL LINKS USING REACT-SCROLL'S ALIASED ScrollLink *** */}
                    {/* Removed onClick={closeSidebar} from ScrollLinks */}
                    <ScrollLink to="home-section" smooth={true} duration={300}>Home</ScrollLink>
                    <ScrollLink to="about-section" smooth={true} duration={300}>About Us</ScrollLink>
                    <ScrollLink to="tourism-section" smooth={true} duration={300}>Tourism Services</ScrollLink>
                    <ScrollLink to="real-estate-section" smooth={true} duration={300}>Real Estate Services</ScrollLink>
                    <ScrollLink to="georgia-section" smooth={true} duration={300}>About Georgia</ScrollLink>
                    {/* For react-router-dom Link, it makes sense to close sidebar */}
                    <Link to="/tours" onClick={closeSidebar} className='discover-tours'>Discover Tours</Link> {/* New link for sidebar */}
                </div>

                <div className="line"></div>

                <div className="terms">
                    <p>Terms & Conditions</p>
                    {/* *** NEW: Using react-router-dom's Link for Privacy Policy *** */}
                    {/* The `Link` here refers to the one imported from 'react-router-dom' */}
                    {/* It makes sense to close the sidebar when navigating to a new route */}
                    <Link to="/privacy-policy" onClick={closeSidebar}>
                        Privacy Policy
                    </Link>
                </div>

                <div className="social-media">
                    <p>Follow Us On Social Media</p>
                    <div className="icons">
                        <img src={icon1} className='icon' alt="Social Media Icon 1" />
                        <img src={icon2} className='icon' alt="Social Media Icon 2" />
                        {/* Use react-scroll's aliased Link for contact with image */}
                        {/* Removed onClick={closeSidebar} from this ScrollLink as well */}
                        <ScrollLink to="contact-section" smooth={true} duration={300}>
                            <img src={icon3} className='icon' alt="Contact Us" />
                        </ScrollLink>
                    </div>
                </div>
            </div>

            <Landing isSidebarOpen={isSidebarOpen} />

        </div>
    );
}

export default Heading;