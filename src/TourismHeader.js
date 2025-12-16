import React, { useState, useEffect } from 'react'
import './Styles/TourismHeader.css'

function TourismHeader() {

     const [currentLanguage, setCurrentLanguage] = useState(() => {
                return localStorage.getItem('selectedLanguage') || 'ara';
            });
                
            // Listen for changes in localStorage
            useEffect(() => {
                const handleStorageChange = () => {
                    const savedLanguage = localStorage.getItem('selectedLanguage');
                    if (savedLanguage) {
                        setCurrentLanguage(savedLanguage);
                    }
                };
                    
                // Listen for storage events (when localStorage changes in other components)
                window.addEventListener('storage', handleStorageChange);
                    
                // Also check periodically in case the storage event doesn't fire
                const interval = setInterval(() => {
                    const savedLanguage = localStorage.getItem('selectedLanguage');
                    if (savedLanguage && savedLanguage !== currentLanguage) {
                        setCurrentLanguage(savedLanguage);
                    }
                }, 100);
                    
                return () => {
                    window.removeEventListener('storage', handleStorageChange);
                    clearInterval(interval);
                };
            }, [currentLanguage]);


    const content ={
        eng: "The Joy of Tourism in Georgia",
        geo: "ტურიზმის სიამოვნება საქართველოში",
        ara: "متعة السياحة في جورجيا"
    }
  return (
    <div className='tourism-header-body'>

        <h2 className="tourism-header-title">
            {content[currentLanguage]}
        </h2>
      
    </div>
  )
}

export default TourismHeader
