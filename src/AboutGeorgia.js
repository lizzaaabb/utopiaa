import React, { useState, useEffect, useRef } from 'react'
import './Styles/AboutGeorgia.css'
import geo1 from './Pictures/geo2.jpg'
import geo2 from './Pictures/geo4.jpg'
import geo3 from './Pictures/geo5.jpg'
import geo4 from './Pictures/geo6.jpg'
import geo5 from './Pictures/geo7.jpg'
import geo6 from './Pictures/geo8.jpg'
import { id } from '../node_modules/webpack/lib/util/concatenate';

function AboutGeorgia() {
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

        // Map language codes to content keys
        const languageMap = {
            'eng': 'english',
            'ara': 'arabic',
            'geo': 'georgian'
        };
            
        const content = {
            english: {
              location: {
                title: "Location",
                text: "At the crossroads of Eastern Europe and Western Asia — bordered by Turkey, Russia, Armenia, and Azerbaijan"
              },
              capital: {
                title: "Capital",
                text: "Tbilisi"
              },
              language: {
                title: "Language",
                text: "Georgian (English and Russian are widely spoken)"
              },
              religion: {
                title: "Religion",
                text: "Predominantly Orthodox Christian, known for religious and cultural tolerance"
              },
              currency: {
                title: "Currency",
                text: "Georgian Lari (GEL)"
              },
              visa: {
                title: "Visa Policy",
                text: "Gulf citizens can enter visa-free and stay up to one full year"
              }
            },
            arabic: {
              location: {
                title: "الموقع",
                text: "بين أوروبا الشرقية وغرب آسيا، تحدّها تركيا وروسيا وأذربيجان وأرمينيا"
              },
              capital: {
                title: "العاصمة", 
                text: "تبليسي"
              },
              language: {
                title: "اللغة",
                text: "الجورجية، لكن الإنجليزية والروسية منتشرتان"
              },
              religion: {
                title: "الديانة",
                text: "غالبية مسيحية، وتُعرف بتسامحها الثقافي والديني"
              },
              currency: {
                title: "العملة",
                text: "لاري جورجي (GEL)"
              },
              visa: {
                title: "التأشيرة",
                text: "مواطني الخليج يمكنهم الدخول بدون تأشيرة والإقامة لمدة عام كامل"
              }
            },
            georgian: {
              location: {
                title: "მდებარეობა",
                text: "აღმოსავლეთ ევროპასა და დასავლეთ აზიას შორის – ესაზღვრება თურქეთს, რუსეთს, სომხეთს და აზერბაიჯანს"
              },
              capital: {
                title: "დედაქალაქი",
                text: "თბილისი"
              },
              language: {
                title: "ენა",
                text: "ქართული (ინგლისური და რუსული ფართოდ გამოიყენება)"
              },
              religion: {
                title: "რელიგია",
                text: "უმრავლესობა მართლმადიდებელი ქრისტიანი – ქვეყანა ცნობილია რელიგიური და კულტურული ტოლერანტობით"
              },
              currency: {
                title: "ვალუტა",
                text: "ლარი (GEL)"
              },
              visa: {
                title: "ვიზა",
                text: "სპარსეთის ყურის ქვეყნების მოქალაქეებს არ სჭირდებათ ვიზა და შეუძლიათ ერთწლიანი ყოფნა"
              }
            }
        };

        const currentContent = content[languageMap[currentLanguage] || 'english'];

        const images = [geo1, geo2, geo3, geo4, geo5, geo6];

  return (
    <div className='about-georgia-body' id="georgia-section">
        <div className="about-georgia-cards-container">
            <div className="about-georgia-card" style={{
                backgroundImage: `url(${images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h2 className="about-georgia-title">
                    {currentContent.location.title}
                </h2>
                <p className="about-georgia-text">
                    {currentContent.location.text}
                </p>
            </div>
            
            <div className="about-georgia-card" style={{
                backgroundImage: `url(${images[1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h2 className="about-georgia-title">
                    {currentContent.capital.title}
                </h2>
                <p className="about-georgia-text">
                    {currentContent.capital.text}
                </p>
            </div>
            
            <div className="about-georgia-card" style={{
                backgroundImage: `url(${images[2]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h2 className="about-georgia-title">
                    {currentContent.language.title}
                </h2>
                <p className="about-georgia-text">
                    {currentContent.language.text}
                </p>
            </div>
            
            <div className="about-georgia-card" style={{
                backgroundImage: `url(${images[3]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h2 className="about-georgia-title">
                    {currentContent.religion.title}
                </h2>
                <p className="about-georgia-text">
                    {currentContent.religion.text}
                </p>
            </div>
            
            <div className="about-georgia-card" style={{
                backgroundImage: `url(${images[4]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h2 className="about-georgia-title">
                    {currentContent.currency.title}
                </h2>
                <p className="about-georgia-text">
                    {currentContent.currency.text}
                </p>
            </div>
            
            <div className="about-georgia-card" style={{
                backgroundImage: `url(${images[5]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h2 className="about-georgia-title">
                    {currentContent.visa.title}
                </h2>
                <p className="about-georgia-text">
                    {currentContent.visa.text}
                </p>
            </div>
        </div>
    </div>
  )
}

export default AboutGeorgia