import React, { useEffect } from 'react'; // Import useEffect
import './Styles/Landing.css';
import { useLocation } from 'react-router-dom'; // Import useLocation to check for hash
import Button2 from './Button2'; // Import your Button2 component

function Landing({ isSidebarOpen }) {
  const location = useLocation(); // Get the current location object
  
  useEffect(() => {
    // If the URL has the hash #home when this component loads
    if (location.hash === '#home') {
      const element = document.getElementById('home');
      if (element) {
        // Use a small timeout to ensure the element has fully rendered
        // before attempting to scroll to it.
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // 100ms delay is usually sufficient
      }
    } else {
      // If the page loads without #home hash (e.g., direct / access),
      // we need to make sure it's at the top if no specific hash is provided.
      // This is a common requirement to prevent issues with remembered scroll positions.
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]); // Re-run effect if pathname or hash changes

  return (
    // Essential: The div must have id="home"
    <div id="home">
      <div className={`landing-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="main-title">
          <h1 className='landing-title'>
            Discover the dream land<br></br>
            of Georgia
          </h1>
        </div>
        <div className="second-title">
          <p>Utopia – Where Comfort Meets Opportunity.
            your trusted gateway into the world of luxury tourism and smart real estate investment.</p>
        </div>
        
        {/* Replace the discover more section with Button2 component */}
        <div className="button2-container">
          <Button2 />
        </div>
      </div>
    </div>
  );
}

export default Landing;