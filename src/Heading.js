import React, { useState } from 'react';
import './Heading.css'
import logo from './logo2.png'


function Heading() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    // Toggle function for the sidebar
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className='heading-body'
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/tbilisi2.jpeg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
     zIndex:1}}> 

        <div className="header-container">
            <div className="header1">
                <img src={logo} alt="utopia vip tourism and real estate" className='utopia-logo' />

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
                        <p className='contact'>Contact Us</p>

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

        <div className="landing-container">
            <div className="main-title">
                <h1 className='landing-title'>
                    Discover the dream land <br></br>
                    of Georgia
                </h1>

            </div>
            <div className="second-title">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                    deleniti nemo iste, expedita assumenda quia? Quibusdam, perspiciatis
                    fuga</p>

            </div>
            <div className="discover-container">
                <div className="discover-text">
                    <p className='discover-title'>Discover More</p>
                </div>
                <div className="discover-bars">
                    <div className="discover-bar"></div>
                    <div className="discover-bar2"></div>
                </div>

            </div>
        </div>

        <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-text">
                <h3>UTOPIA</h3>
                <p>VIP Tourism & Real Estate</p>
            </div>

            <div className="menu-items">
                <a href="#">Home</a>
                <a href="#">Real Estate</a>
                <a href="#">Travel Packages</a>
                <a href="#">Contact</a>
            </div>
            <div className="line"></div>
            <div className="terms">
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
            </div>

            <div className="social-media">
                <p>Follow Us On Social Media</p>
                <p>icon</p>
                <p>icon</p>
                <p>icon</p>
            </div>
        </div>
      
    </div>
  )
}

export default Heading
