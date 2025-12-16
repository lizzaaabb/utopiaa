import React, {useState, useEffect, useRef} from 'react'
import './Styles/TourismServices.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function TourismServices() {
  const [tourismLanguage, setTourismLanguage] = useState('eng2');
  const tourismServiceCardsRef = useRef([]);
  const tourismSectionHeaderRef = useRef(null);
  
  // Content for different languages
  const tourismContent = {
    eng2: {
      title2: "Our Tourism Services",
      subtitle2: "Experience Georgia Like Never Before",
      services: [
        "Tailored tourism packages for families and individuals, including accommodation, transport, and curated activities",
        "Private tours to Georgia's most stunning natural and cultural destinations",
        "VIP services: private driver, translator, personal chef, and Arabic-speaking guides",
        "Event organization for families, groups, or business clients in premium, private settings",
        "Personal travel consultation to customize every trip to your specific needs"
      ]
    },
    geo3: {
      title2: "ჩვენი ტურისტული სერვისები",
      subtitle2: "განიცადეთ საქართველო, როგორც არასდროს",
      services: [
        "მორგებული ტურისტული პაკეტები ოჯახებისა და ინდივიდუალური მოგზაურებისთვის",
        "პრივატული ტურები საქართველოს ყველაზე მშვენიერ ბუნებრივ და კულტურულ ადგილებში",
        "VIP სერვისები: პირადი მძღოლი, თარჯიმანი, პირადი მზარეული და არაბულენოვანი გიდები",
        "ღონისძიებების ორგანიზება ოჯახებისთვის, ჯგუფებისთვის ან ბიზნეს კლიენტებისთვის",
        "პირადი მოგზაურობის კონსულტაცია თქვენი კონკრეტული საჭიროებების მიხედვით"
      ]
    },
    ara2: {
      title2: "خدماتنا السياحية",
      subtitle2: "اكتشف جورجيا بطريقة استثنائية",
      services: [
        "باقات سياحية متكاملة للعوائل والأفراد، تشمل الإقامة، التنقل، والأنشطة",
        "جولات خاصة في أجمل مناطق جورجيا الطبيعية والتاريخية",
        "خدمات VIP: سائق خاص، مترجم، طاهٍ شخصي، ومرافق سياحي متحدث بالعربية",
        "تنظيم فعاليات ومناسبات خاصة في أجواء راقية وخصوصية عالية",
        "استشارات شخصية لاختيار الوجهات والبرامج السياحية حسب الطلب"
      ]
    }
  };

  const tourismLanguageOptions = [
    { value: 'eng2', label: 'ENG' },
    { value: 'geo3', label: 'GEO' },
    { value: 'ara2', label: 'العربية' }
  ];

  const handleTourismLanguageChange = (language) => {
    setTourismLanguage(language);
  };

  // GSAP Animation setup
  useEffect(() => {
    // Header animation
    gsap.fromTo(tourismSectionHeaderRef.current, 
      {
        opacity: 0,
        y: -30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Cards animation
    tourismServiceCardsRef.current.forEach((tourismServiceCard, index) => {
      if (tourismServiceCard) {
        // Set initial state
        gsap.set(tourismServiceCard, {
          opacity: 0,
          y: 50,
          scale: 0.9
        });

        // Create scroll trigger animation with unique ID
        gsap.to(tourismServiceCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          delay: index * 0.1, // Stagger each card
          scrollTrigger: {
            trigger: tourismServiceCard,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            id: `tourism-card-${index}`, // Unique ID for each trigger
            markers: false
          }
        });

        // Add hover animation
        const handleTourismMouseEnter = () => {
          gsap.to(tourismServiceCard, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleTourismMouseLeave = () => {
          gsap.to(tourismServiceCard, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        tourismServiceCard.addEventListener('mouseenter', handleTourismMouseEnter);
        tourismServiceCard.addEventListener('mouseleave', handleTourismMouseLeave);

        // Cleanup event listeners
        return () => {
          tourismServiceCard.removeEventListener('mouseenter', handleTourismMouseEnter);
          tourismServiceCard.removeEventListener('mouseleave', handleTourismMouseLeave);
        };
      }
    });

    // Cleanup ScrollTrigger on unmount - only tourism specific ones
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.id && trigger.vars.id.startsWith('tourism-card-')) {
          trigger.kill();
        }
      });
    };
  }, [tourismLanguage]); // Re-run when language changes

  const currentTourismContent = tourismContent[tourismLanguage];

  return (
    <div className='tourism-services-body-unique'  data-language={tourismLanguage} >
      <div className="tourism-language-selector-container" ref={tourismSectionHeaderRef}>
        <div className="tourism-header-content" >
          <h2 className='tourism-services-title'>{currentTourismContent.title2}</h2>
          <p className='tourism-services-subtitle'>{currentTourismContent.subtitle2}</p>
        </div>
        
        <div className="tourism-language-switcher">
          <select 
            value={tourismLanguage} 
            onChange={(e) => handleTourismLanguageChange(e.target.value)}
            className="tourism-language-dropdown"
          >
            {tourismLanguageOptions.map((option) => (
            <option 
            key={option.value} 
            value={option.value}
            style={{ color: 'black' }}
            >
    {option.label}
  </option>
))}
          </select>
        </div>
      </div>
      
      <div className="tourism-services-container">
        {currentTourismContent.services.map((service, index) => (
          <div 
            key={index} 
            className="tourism-service-card"
            ref={el => tourismServiceCardsRef.current[index] = el}
          >
            {/* Card design space - add your custom design elements here */}
            <div className="tourism-card-design-area">
              {/* This is where you can add icons, images, or other design elements */}
            </div>
            
            <div className="tourism-card-content">
              <p className="tourism-service-description">{service}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TourismServices