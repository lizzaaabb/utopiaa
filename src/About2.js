import React, {useState, useEffect, useRef} from 'react'
import './Styles/About2.css' // Import your CSS styles
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Phone from './Phone' // Import your Phone component


import bg1 from './Pictures/bag1.jpg'
import bg2 from './Pictures/bag2.jpg'
import bg3 from './Pictures/bag3.jpg'
import bg4 from './Pictures/bag4.jpg'
import bg5 from './Pictures/bag5.jpg'

import re1 from './Pictures/re1.jpg'
import re2 from './Pictures/re2.jpg'
import re3 from './Pictures/re3.jpg'
import re4 from './Pictures/re4.jpg'
import re5 from './Pictures/re5.jpg'

import icon1 from './Pictures/icn1.png'
import icon2 from './Pictures/icn2.png'
import icon3 from './Pictures/icn3.png'
import icon4 from './Pictures/icn4.png'
import icon5 from './Pictures/icn5.png'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function About2() {
  const [currentLanguage, setCurrentLanguage] = useState('ara');
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const cardsRef = useRef([]);
  const chooseCardsRef = useRef([]);
  const headerRef = useRef(null);
  const closingTextRef = useRef(null);
  
  // Store hover animations to prevent memory leaks
  const hoverAnimations = useRef([]);
  
  // Content for different languages
  const content = {
    eng: {
      title: "About Us",
      subtitle: "Utopia – Where Comfort Meets Opportunity",
      cards: [
        {
          text: "In the heart of Georgia's natural beauty and tranquil atmosphere, Utopia was established to be your trusted gateway into the world of luxury tourism and smart real estate investment."
        },
        {
          text: "Utopia is more than just a name — it's a philosophy. Inspired by the concept of the \"ideal city\", we offer an experience where comfort, elegance, and professionalism come together to meet the expectations of both travelers and investors alike."
        },
        {
          title: "Who We Are",
          text: "Utopia is a licensed Georgian company specializing in providing premium tourism services and high-value real estate investment opportunities, tailored especially for visitors and investors from the Gulf region who seek privacy, quality, and excellence in every detail."
        },
        {
          title: "What Does \"Utopia\" Mean?",
          text: "\"Utopia\" refers to the perfect place — a world of harmony between people and nature, between rest and precision, between pleasure and investment. This is exactly what we deliver: a well-organized environment, carefully designed services, and a luxurious experience that suits the Gulf lifestyle."
        }
      ],
      tourismTitle: "Our Tourism Services",
      tourismServices: [
        "Tailored tourism packages for families and individuals, including accommodation, transport, and curated activities",
        "Private tours to Georgia's most stunning natural and cultural destinations",
        "VIP services: private driver, translator, personal chef, and Arabic-speaking guides",
        "Event organization for families, groups, or business clients in premium, private settings",
        "Personal travel consultation to customize every trip to your specific needs"
      ],
      realEstateTitle: "Our Real Estate Services",
      realEstateServices: [
        "Ownership and investment in prime tourism properties (villas, apartments, resorts)",
        "Property management and rental services to generate steady income",
        "Full support with banking, property registration, and residency procedures",
        "Custom property design with full architectural and construction supervision",
        "Legal advisory ensuring transparent and safe purchases for foreign investors"
      ],
      chooseTitle: "Why Choose Utopia?",
      chooseReasons: [
        "Local expertise with a deep understanding of Gulf client needs",
        "High-quality service and attention to detail",
        "Strong partnerships with Georgia's top resorts, hotels, and developers",
        "Exceptional facilitation for ownership and investment",
        "A professional Arabic-speaking team dedicated to your satisfaction"
      ],
      closingText: "Utopia is not just a trip or a property — it's your gateway to a new lifestyle. Whether you're seeking relaxation or long-term opportunity, we're here to guide you every step of the way. Contact us today and begin your journey in Georgia with Utopia."
    },
    geo: {
      title: "ჩვენს შესახებ",
      subtitle: "იუტოპია – სადაც კომფორტი შესაძლებლობებს ხვდება",
      cards: [
        {
          text: "საქართველოს თვალწარმტაცი ბუნების გულში, მშვიდ და უსაფრთხო გარემოში, დაიბადა კომპანია \"იუტოპია\" — თქვენი სანდო მეგზური პრემიუმ ტურიზმისა და ჭკვიანი ინვესტიციების სამყაროში."
        },
        {
          text: "იუტოპია მხოლოდ სახელი კი არა, არამედ ფილოსოფიაა — შთაგონებული \"იდეალური ქალაქის\" ცნებით, სადაც კომფორტი, ესთეტიკა და პროფესიონალიზმი ერთიანდება, რათა დაგხვდეთ სრულყოფილი გამოცდილებით როგორც მოგზაურებისთვის, ისე ინვესტორებისთვის."
        },
        {
          title: "ვინ ვართ ჩვენ",
          text: "\"იუტოპია\" არის ლიცენზირებული ქართული კომპანია, რომელიც სპეციალიზებულია პრემიუმ ტურისტულ მომსახურებებსა და უძრავი ქონების ინვესტიციებზე, განსაკუთრებით დაფუძნებული სპარსეთის ყურის ქვეყნების დამსვენებლებისა და ინვესტორებისთვის, ვინც ეძებს კომფორტს, კონფიდენციალობას და ხარისხს."
        },
        {
          title: "რას ნიშნავს \"იუტოპია\"?",
          text: "\"იუტოპია\" ნიშნავს იდეალურ ადგილს — ჰარმონიის სივრცეს ადამიანსა და ბუნებას შორის, დასვენებასა და მოწესრიგებულობას შორის, სიამოვნებასა და სარგებელს შორის. სწორედ ამას გთავაზობთ ჩვენ: პროფესიონალურად ორგანიზებულ გარემოს, მაღალი დონის სერვისებსა და განსაკუთრებულ გამოცდილებას, მორგებულს თქვენი კულტურისა და გემოვნების შესაბამისად."
        }
      ],
      tourismTitle: "ჩვენი ტურისტული სერვისები",
      tourismServices: [
        "ინდივიდუალური ტურისტული პაკეტები ოჯახებისთვისა და სოლო მოგზაურებისთვის — საცხოვრებელი, ტრანსპორტი და აქტივობები",
        "პირადი ტური საქართველოს ულამაზეს ბუნებრივ და ისტორიულ ადგილებში",
        "VIP სერვისები: პირადი მძღოლი, თარჯიმანი, პირადი მზარეული და არაბულენოვანი გიდი",
        "ღონისძიებების ორგანიზება ოჯახური ან ბიზნესი საჭიროებების მიხედვით",
        "პერსონალური კონსულტაცია თქვენი მოგზაურობის მაქსიმალურად მორგებისთვის"
      ],
      realEstateTitle: "ჩვენი უძრავი ქონების სერვისები",
      realEstateServices: [
        "უძრავი ქონების შეძენა და ინვესტიცია ტურისტულ ზონებში (ვილები, ბინები, რეზიდენციები)",
        "ქონების მართვა და გაქირავება სტაბილური შემოსავლისთვის",
        "სრული სამართლებრივი და საბანკო მხარდაჭერა",
        "ინტერიერისა და ექსტერიერის დიზაინი და მშენებლობის ზედამხედველობა",
        "ინვესტორის დაცულობა სანდო და გამჭვირვალე სამართლებრივი პროცესებით"
      ],
      chooseTitle: "რატომ იუტოპია?",
      chooseReasons: [
        "ღრმა ცოდნა ადგილობრივი ბაზრის და არაბი კლიენტების საჭიროებების შესახებ",
        "მაღალი ხარისხის მომსახურება და დეტალებზე ფოკუსირება",
        "პარტნიორობა საქართველოს წამყვან სასტუმროებთან და დეველოპერებთან",
        "გამარტივებული პროცედურები საკუთრებისა და ინვესტიციისთვის",
        "არაბულენოვანი პროფესიონალი გუნდი"
      ],
      closingText: "\"იუტოპია\" არ არის უბრალოდ მოგზაურობა ან ქონება — ეს არის კარიბჭე ახალი ცხოვრების სტილისკენ. დასვენების თუ გრძელვადიანი შესაძლებლობის მაძიებელი ხართ — ჩვენ თქვენს გვერდით ვართ. დაგვიკავშირდით დღეს და დაიწყეთ თქვენი გზა საქართველოში \"იუტოპია\"-სთან ერთად."
    },
    ara: {
      title: "معلومات عنا",
      subtitle: "يوتوبيا – حيث تلتقي الراحة بالفرصة",
      cards: [
        {
          text: "في قلب الطبيعة الجورجية، ووسط أجواء هادئة وآمنة، انطلقت شركة يوتوبيا لتكون وجهتك الموثوقة في عالم السياحة والاستثمار العقاري."
        },
        {
          text: "يوتوبيا ليست مجرد اسم، بل فلسفة. مستوحاة من مفهوم \"المدينة الفاضلة\"، حيث تتجسد الراحة، الجمال، والنظام في تجربة متكاملة تلبي تطلعات الزائر والمستثمر على حد سواء."
        },
        {
          title: "من نحن",
          text: "يوتوبيا هي شركة جورجية مرخصة، متخصصة في تقديم خدمات سياحية فاخرة وتجهيز فرص استثمار عقاري ذكي، تستهدف بشكل خاص الزوّار والمستثمرين من دول الخليج، الباحثين عن تجربة راقية خارج زحام المدن وضغوط الحياة."
        },
        {
          title: "ما معنى \"يوتوبيا\"؟",
          text: "\"يوتوبيا\" تعني \"المدينة المثالية\" أو \"العالم الكامل\"، حيث يسود الانسجام بين الإنسان والطبيعة، بين الراحة والاحتراف، بين المتعة والاستثمار. وهذا هو جوهر ما نقدّمه لعملائنا: بيئة منظمة، خدمات مدروسة، وتجربة مُصممة لتلائم الذوق الخليجي."
        }
      ],
      tourismTitle: "خدماتنا السياحية",
      tourismServices: [
        "باقات سياحية متكاملة للعوائل والأفراد، تشمل الإقامة، التنقل، والأنشطة",
        "جولات خاصة في أجمل مناطق جورجيا الطبيعية والتاريخية",
        "خدمات VIP: سائق خاص، مترجم، طاهٍ شخصي، ومرافق سياحي متحدث بالعربية",
        "تنظيم فعاليات ومناسبات خاصة في أجواء راقية وخصوصية عالية",
        "استشارات شخصية لاختيار الوجهات والبرامج السياحية حسب الطلب"
      ],
      realEstateTitle: "خدماتنا العقارية",
      realEstateServices: [
        "تملك واستثمار العقارات السياحية (شقق، فلل، منتجعات) في مواقع استراتيجية",
        "إدارة وتأجير ممتلكات العملاء داخل جورجيا بعائد استثماري منتظم",
        "خدمات مرافقة: فتح حسابات بنكية، تسجيل العقارات، إقامة قانونية",
        "تصميم عقاري حسب الطلب، مع إشراف هندسي وتنفيذي متكامل",
        "دعم قانوني كامل لتملك الأجانب وضمان شفافية العمليات"
      ],
      chooseTitle: "لماذا يوتوبيا؟",
      chooseReasons: [
        "خبرة محلية وفهم عميق لاحتياجات الزائر الخليجي",
        "جودة عالية في الخدمة، واهتمام بالتفاصيل",
        "شراكات مع أفضل الفنادق، المنتجعات، والمطورين العقاريين في جورجيا",
        "تسهيلات استثنائية للتملك والاستثمار",
        "فريق عربي يتحدث لغتك ويفهم ذوقك"
      ],
      closingText: "يوتوبيا… ليست مجرد رحلة أو عقار، بل بوابتك نحو أسلوب حياة مختلف. سواء كنت تبحث عن راحة مؤقتة أو استقرار دائم، نحن هنا لنرشدك إلى القرار الصحيح. تواصل معنا اليوم، وابدأ قصتك في جورجيا مع يوتوبيا"
    }
  };
  
  const tourismImages = [bg1, bg2, bg3, bg4, bg5];
  const realEstateImages = [re1, re2, re3, re4, re5];
  const chooseIcons = [icon1, icon2, icon3, icon4, icon5];

  const languageOptions = [
    { value: 'eng', label: 'ENG' },
    { value: 'geo', label: 'GEO' },
    { value: 'ara', label: 'العربية' }
  ];

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const showPhoneContainer = () => {
    setIsPhoneVisible(true);
  };

  const hidePhoneContainer = () => {
    setIsPhoneVisible(false);
  };

  // Optimized animation function - Only for About cards and Choose cards
  const createCardAnimations = (cardRefs, sectionName) => {
    const cards = cardRefs.current.filter(card => card !== null);
    if (cards.length === 0) return;

    // Batch set initial states
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      scale: 0.9
    });

    // Create single timeline for all cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        id: sectionName
      }
    });

    // Animate all cards with stagger
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.2)",
      stagger: 0.1
    });

    // Add optimized hover effects
    cards.forEach((card, index) => {
      const hoverTween = gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
        paused: true
      });

      const handleMouseEnter = () => hoverTween.play();
      const handleMouseLeave = () => hoverTween.reverse();

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Store for cleanup
      hoverAnimations.current.push({
        element: card,
        tween: hoverTween,
        enterHandler: handleMouseEnter,
        leaveHandler: handleMouseLeave
      });
    });
  };

  // GSAP Animation setup - Optimized (removed tourism and real estate animations)
  useEffect(() => {
    // Clear previous hover animations
    hoverAnimations.current.forEach(({ element, tween, enterHandler, leaveHandler }) => {
      element.removeEventListener('mouseenter', enterHandler);
      element.removeEventListener('mouseleave', leaveHandler);
      tween.kill();
    });
    hoverAnimations.current = [];

    // Kill existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Create animations only for About cards and Choose cards
    createCardAnimations(cardsRef, 'about-cards');
    createCardAnimations(chooseCardsRef, 'choose-cards');

    // Cleanup function
    return () => {
      // Clean up hover animations
      hoverAnimations.current.forEach(({ element, tween, enterHandler, leaveHandler }) => {
        if (element) {
          element.removeEventListener('mouseenter', enterHandler);
          element.removeEventListener('mouseleave', leaveHandler);
        }
        tween.kill();
      });
      hoverAnimations.current = [];
      
      // Kill ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLanguage]);

  const currentContent = content[currentLanguage];

  return (
    <div className='aboutbody2'>
      <div className="language-change-container" id="about-section" ref={headerRef}>
        <div className="about-text-container">
          <h2 className='about-us-title' >{currentContent.title}</h2>
          <p className='about-us-description'>{currentContent.subtitle}</p>
        </div>
        
        <div className="language">
          <select 
            value={currentLanguage} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="language-dropdown"
          >
            {languageOptions.map((option) => (
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
      
      {/* About Us Cards */}
      <div className="cards-container">
        {currentContent.cards.map((card, index) => (
          <div 
            key={index} 
            className="card"
            ref={el => cardsRef.current[index] = el}
          >
            {card.title && <h3 className="card-title">{card.title}</h3>}
            <p className="card-text">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Tourism Services Section - No animations */}
      <div className="tourism-section" id="tourism-section">
        <h2 className="tourism-title">{currentContent.tourismTitle}</h2>
        <div className="tourism-cards-container">
        {currentContent.tourismServices.map((service, index) => (
         <div 
        key={index} 
        className="tourism-card"
        style={{
          backgroundImage: `url(${tourismImages[index]})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        >
        <div className="tourism-card-content">
          <p className="tourism-service-text">{service}</p>
        </div>
      </div>
          ))}
        </div>
      </div>

      {/* Real Estate Services Section - No animations */}
      <div className="tourism-section" id="real-estate-section">
        <h2 className="tourism-title">{currentContent.realEstateTitle}</h2>
        <div className="tourism-cards-container">
        {currentContent.realEstateServices.map((service, index) => (
         <div 
        key={index} 
        className="tourism-card"
        style={{
          backgroundImage: `url(${realEstateImages[index]})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        >
        <div className="tourism-card-content">
          <p className="tourism-service-text">{service}</p>
        </div>
      </div>
          ))}
        </div>
      </div>

      {/* Choose Utopia Section */}
      <div className="choose-utopia">
        <h2 className="choose-utopia-title">{currentContent.chooseTitle}</h2>
        <div className="choose-cards-container">
          {currentContent.chooseReasons.map((reason, index) => (
            <div 
              key={index} 
              className="choose-card"
              ref={el => chooseCardsRef.current[index] = el}
            >
              <div className="choose-card-content">
                <img 
                  src={chooseIcons[index]} 
                  className='choose-icon' 
                  alt={`Choose reason ${index + 1}`}
                />
                <p className="choose-utopia-text">{reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="contact-utopia" id="contact">
        <p className="contact-utopia-text" ref={closingTextRef}>
          {currentContent.closingText}
        </p>
        <button className='contact-utopia-btn' onClick={showPhoneContainer}>
          {currentLanguage === 'eng' && 'Contact Us'}
          {currentLanguage === 'geo' && 'დაგვიკავშირდით'}
          {currentLanguage === 'ara' && 'تواصل معنا'}
        </button>
      </div>

      {/* Phone Container - Only show when isPhoneVisible is true */}
      {isPhoneVisible && (
        <div className="phone-body">
          <div className='phone-container'>
            <div className='phone-text'>
              <p className='phone-title'>Contact Us</p>
              <p className='phone-number'>+995 500 888 171</p>
              <p className='phone-number'>+995 514 511 166</p>
              <p className='phone-number'>+995 599 520 113</p>
            </div>
            <div className='close-button' onClick={hidePhoneContainer}>
              <div className='line1'></div>
              <div className='line2'></div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default About2