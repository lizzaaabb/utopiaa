// src/Georgia.jsx

import React, { useState, useEffect } from 'react';
import './Styles/Georgia.css';
import arrow from './Pictures/chevron.png';
// We no longer need 'scroller' from 'react-scroll' for this specific button's function
// import { scroller } from 'react-scroll'; // REMOVE OR COMMENT OUT THIS LINE

function Georgia() {

    // Function to handle the "Discover More" button click
    const scrollToDiscoverMore = () => {
        // Use window.scrollBy to scroll down by a specific amount (e.g., 400 pixels)
        // 'behavior: "smooth"' ensures a smooth animation.
        window.scrollBy({
            top: 700, // Adjust this value (in pixels) to scroll down more or less
            behavior: 'smooth'
        });
    };

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

    // Content object holding translated texts
    const content = {
        eng: {
            title: "Georgia – Where Smart Investment Meets Real Enjoyment",
            description: "In recent years, Georgia has become one of the top destinations for those seeking natural beauty, peace of mind, and profitable investment opportunities — all in one place. A small country in size, yet rich in possibilities for anyone looking for a refined lifestyle or secure investment.",
            discoverMore: "Discover More"
        },
        geo: {
            title: "საქართველო – იქ, სადაც ინვესტიცია სარგებლიანია და დასვენება ნამდვილი სიამოვნებაა",
            description: "ბოლო წლებში საქართველო იქცა ერთ-ერთ ყველაზე მოთხოვნად მიმართულებად მათთვის, ვინც ეძებს ბუნების სილამაზეს, სიმშვიდეს და მომგებიან ინვესტიციას ერთდროულად. პატარა ქვეყანა გეოგრაფიულად, მაგრამ დიდი შესაძლებლობებით მათთვის, ვინც მოისურვებს ახალი ცხოვრების სტილს ან სანდო ინვესტიციას.",
            discoverMore: "გაიგეთ მეტი"
        },
        ara: {
            title: "جورجيا… حيث يجتمع الاستثمار الذكي والمتعة الحقيقية",
            description: "في السنوات الأخيرة، أصبحت جورجيا من أبرز الوجهات التي تجمع بين الطبيعة الساحرة، الهدوء، والفرص الاستثمارية الذهبية. بلد صغير بحجمه، لكنه كبير بجماله، سهل الوصول، سهل التملك، وواسع الآفاق أمام كل من يبحث عن نمط حياة راقٍ أو استثمار مضمون.",
            discoverMore: "اكتشف المزيد"
        }
    };

    return (
        <div
            className='georgia-body'
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/tbilisiback3.jpeg)`,
                backgroundSize: 'cover',
                zIndex: 1
            }}
            id="georgia-section" // This ID is still useful for ScrollLinks from your main navigation
        >
            <div className="georgia-container">
                <div className="georgia-header">
                    <h2 className="georgia-title">
                        {content[currentLanguage].title}
                    </h2>
                </div>

                <div className="georgia-content">
                    <p className="georgia-description">
                        {content[currentLanguage].description}
                    </p>
                </div>

                <div className="georgia-button-container">
                    <button className="georgia-discover-button" onClick={scrollToDiscoverMore}>
                        {content[currentLanguage].discoverMore}
                    </button>
                    <div className="georgia-icon">
                        <img src={arrow} alt="Discover More" className="georgia-arrow-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Georgia;