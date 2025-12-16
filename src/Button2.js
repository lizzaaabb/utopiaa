import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { Hotel, Plane, Earth } from 'lucide-react';
import './Styles/Button2.css'; // Your luxury styles

const TravelBookingComponent = () => {
  const [activeTab, setActiveTab] = useState('tours'); // Changed from 'hotels' to 'tours'
  
  const tabs = [
    {
      id: 'tours',
      label: "Discover Tours",
      icon: Earth,
      url: '/tours', // Internal route
      isInternal: true // Flag to identify internal routes
    },
    {
      id: 'hotels',
      label: 'Hotels',
      icon: Hotel,
      url: 'https://www.trip.com/hotels/list?city=7612&display=Tbilisi&optionId=7612&optionType=City&optionName=Tbilisi&Allianceid=6623016&SID=225750218&trip_sub1=hotelTest',
      isInternal: false
    },
    {
      id: 'flights',
      label: 'Flights',
      icon: Plane,
      url: 'https://www.trip.com/flights/welcome/?to=home&Allianceid=6623016&SID=225750218&trip_sub1=flightTest',
      isInternal: false
    },
  ];

  const handleExternalClick = (tab) => {
    setActiveTab(tab.id);
    const link = document.createElement('a');
    link.href = tab.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInternalClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="luxury-container">
      <div className="luxury-glow"></div>
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        // Render internal route as Link
        if (tab.isInternal) {
          return (
            <Link
              key={tab.id}
              to={tab.url}
              onClick={() => handleInternalClick(tab.id)}
              className={`luxury-button ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none' }} // Remove default link styling
            >
              <IconComponent className="luxury-icon" />
              <span className="luxury-label">{tab.label}</span>
            </Link>
          );
        }
        
        // Render external routes as buttons
        return (
          <button
            key={tab.id}
            onClick={() => handleExternalClick(tab)}
            className={`luxury-button ${isActive ? 'active' : ''}`}
          >
            <IconComponent className="luxury-icon" />
            <span className="luxury-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TravelBookingComponent;