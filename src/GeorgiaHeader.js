import React, { useState, useEffect } from 'react'
import './Styles/GeorgiaHeader.css'

function GeorgiaHeader() {
    // Get language from localStorage, default to 'eng'
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
        
    const content = {
        eng: "About Georgia",
        geo: "საქართველოს შესახებ",
        ara: "نبذة عن جورجيا"
    }

    return (
        <div className='georgia-header-body'>
            <h2 className="georgia-header-title">
                {content[currentLanguage]}
            </h2>
        </div>
    )
}

export default GeorgiaHeader