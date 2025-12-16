import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Styles/Opportunity.css'

function Opportunity() {
    // Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

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
            geo: {
                title: "შესანიშნავი შესაძლებლობა 'იუტოპია'-სთან ერთად",
                lookingFor: "თუ ეძებთ საცხოვრებელს დასვენებისთვის, ინვესტიციურ ბინას სტაბილური შემოსავლით, გარემოს, სადაც გსურთ დამკვიდრება ",
                fullSupport: "იუტოპია გთავაზობთ სრულ მხარდაჭერას – კონსულტაციიდან დაწყებული საკუთრების მართვამდე, გაქირავებიდან იურიდიულ დაცვამდე – ყველაფერი გამჭვირვალედ და უსაფრთხოდ.",
                georgiaPlace: "საქართველო არის ადგილი, სადაც დასვენება ლამაზია და ინვესტიცია ჭკვიანი გადაწყვეტილება.",
                relax:" დაისვენეთ და ინვესტიცია ჩადეთ ერთდროულად – იუტოპია-სთან ერთად."
            },
            eng: {
                title: "A Golden Opportunity with Utopia",
                lookingFor: "Whether you're looking for a vacation home, a high-return rental property, a new lifestyle in a safe, beautiful country ",
                fullSupport: "Utopia offers full support: From consultation to property purchase, from management to rental — with complete legal transparency and peace of mind.",
                georgiaPlace: "Georgia is the place where luxury living meets smart investing.",
                relax: "Relax, and invest — all at once — with Utopia."
            },
            ara: {
                title: "الفرصة الآن مع يوتوبيا",
                lookingFor: "سواء كنت تبحث عن منزل لقضاء العطلات، شقة استثمارية تدر دخلاً منتظمًا، فرصة للاستقرار في بلد جميل وآمن ",
                fullSupport: "يوتوبيا تقدم لك كل الدعم اللازم: من الاستشارات إلى الشراء، من الإدارة إلى التأجير، بأمان قانوني وشفافية تامة.",
                georgiaPlace: "جورجيا هي المكان الذي يجمع بين رقيّ الإقامة، جمال الطبيعة، وقوة العائد الاستثماري.",
                relax:"استمتع بعطلتك، واستثمر في مستقبلك — مع يوتوبيا."
            }
        };
  return (
    <div className='opportunity-body'>

        <h2 className="opportunity-title">
            {content[currentLanguage].title}
        </h2>
        <p className='looking-for'>
            {content[currentLanguage].lookingFor}
            {content[currentLanguage].fullSupport}
        </p>

        <p className="georgia-place">
            {content[currentLanguage].georgiaPlace}
        </p>

        <p className="relax">
            {content[currentLanguage].relax}
        </p>
      
    </div>
  )
}

export default Opportunity
