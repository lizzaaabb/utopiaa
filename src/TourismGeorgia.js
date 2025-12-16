import React, { useState, useEffect } from 'react'
import './Styles/TourismGeorgia.css'
import { id } from '../node_modules/webpack/lib/util/concatenate';

function TourismGeorgia() {

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
            eng: {
                features: [
                    "Breathtaking nature: Caucasus Mountains, mineral springs, waterfalls, and lakes",
                    "Mild climate all year round", 
                    "Affordable prices compared to Europe and neighboring countries",
                    "Friendly locals who welcome visitors warmly",
                    "Ideal for Gulf families: privacy, tradition, and luxury combined",
                    "Wide range of activities: skiing, spa resorts, mountain hiking, modern shopping"
                ]
            },
            geo: {
                features: [
                    "შვენიერი ბუნება: კავკასიონის მთები, მინერალური წყლები, ჩანჩქერები და ტბები",
                    "ზომიერი კლიმატი მთელი წლის განმავლობაში",
                    "მოსახერხებელი ფასები ევროპასთან შედარებით",
                    "მეგობრული ხალხი – სტუმრებს დიდი სითბოთი ხვდებიან",
                    "შესაფერისია არაბული ოჯახებისთვის: კონფიდენციალურობა, ტრადიციული გარემო, მაღალი დონის სერვისები",
                    "მრავალფეროვანი აქტივობები: თხილამურები, სპა, მთის ტურები, შოპინგი"
                ]
            },
            ara: {
                features: [
                    "طبيعة مذهلة: جبال القوقاز، ينابيع معدنية، شلالات، وبحيرات",
                    "مناخ معتدل طوال العام، مع ثلوج شتوية وربيع مدهش",
                    "أسعار معقولة مقارنة بأوروبا ودول الجوار",
                    "شعب ودود يستقبلك بحب واحترام",
                    "مناسب للعوائل الخليجية: خصوصية، أجواء محافظة، ومرافق راقية",
                    "تنوع في الأنشطة: من التزلج والرحلات الجبلية إلى الحمامات الكبريتية والتسوق العصري"
                ]
            }
        }

  return (
    <div className='tourism-georgia-body' >

<div class="card-3d">
  <div><p className='tourism-georgia-text'>
    {content[currentLanguage].features[0]}
    </p></div>
  <div><p className='tourism-georgia-text'>
    {content[currentLanguage].features[1]}
    </p></div>
  <div><p className='tourism-georgia-text'>
    {content[currentLanguage].features[2]}
    </p></div>
  <div><p className='tourism-georgia-text'>
    {content[currentLanguage].features[3]}
    </p></div>
  <div><p className='tourism-georgia-text'>
    {content[currentLanguage].features[4]}
    </p></div>
  <div><p className='tourism-georgia-text'>
    {content[currentLanguage].features[5]}
    </p></div>
</div>

      
    </div>
  )
}

export default TourismGeorgia
