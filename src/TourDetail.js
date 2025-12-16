// --- ALL IMPORTS MUST COME FIRST ---
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Footer from './Footer.js';
import './Styles/TourDetail.css';
import pic1 from './Pictures/tour1.jpg';
import pic2 from './Pictures/tour2.jpg';
import pic3 from './Pictures/tour3.jpg';
import pic4 from './Pictures/tour4.jpg';
import {
    sevenNightsEightDays,
    nineNightsTenDays,
    fourteenNightsFifteenDays,
    twelveNightsThirteenDays
} from './Array.js'; // <- Ensure this path is 100% correct relative to TourDetail.js

// --- NOW, after ALL imports, add your console.logs and other declarations ---
console.log("--- TourDetail.js: Start of File (after imports) ---");
// --- Verify imports from Array.js ---
console.log("sevenNightsEightDays (after import):", sevenNightsEightDays);
console.log("nineNightsTenDays (after import):", nineNightsTenDays);
console.log("fourteenNightsFifteenDays (after import):", fourteenNightsFifteenDays);
console.log("twelveNightsThirteenDays (after import):", twelveNightsThirteenDays);
// --- End Array.js import verification ---


const allTourPackages = [
  // Tour ID 1: 7 Nights / 8 Days
  {
    id: 1,
    details: sevenNightsEightDays,
    rating: 4.8,
    reviews: 245,
    image: pic1,
    priceOptions: [
      { stars: 4, label: "4-Star Package", price: "$1111" },
      { stars: 5, label: "5-Star Package", price: "$1333" }
    ]
  },
  // Tour ID 2: 9 Nights / 10 Days
  {
    id: 2,
    details: nineNightsTenDays,
    rating: 4.9,
    reviews: 189,
    image: pic2,
    priceOptions: [
      { stars: 4, label: "4-Star Package", price: "$1500" },
      { stars: 5, label: "5-Star Package", price: "$1850" }
    ]
  },
  // Tour ID 3: Re-mapped to 12 Nights / 13 Days
  {
    id: 3,
    details: twelveNightsThirteenDays, // Now uses the 12-night data
    rating: 4.9,
    reviews: 312,
    image: pic3,
    priceOptions: [
      { stars: 4, label: "4-Star Package", price: "$3600" }, // Updated price
      { stars: 5, label: "5-Star Package", price: "$6100" }  // Updated price
    ]
  },
  // Tour ID 4: Re-mapped to 14 Nights / 15 Days
  {
    id: 4,
    details: fourteenNightsFifteenDays, // Now uses the 14-night data
    rating: 4.8,
    reviews: 156,
    image: pic4,
    priceOptions: [
      { stars: 4, label: "4-Star Package", price: "$4000" }, // Updated price
      { stars: 5, label: "5-Star Package", price: "$7000" }  // Updated price
    ]
  }
];

// --- Verify allTourPackages structure ---
console.log("allTourPackages (constructed):", allTourPackages);
console.log("allTourPackages[0].details (Tour 1 details):", allTourPackages[0]?.details);
// Add a log for the newly mapped ID 3 (ex-ID 4)
console.log("allTourPackages[2].details (Tour 3 details, from 12-nights):", allTourPackages[2]?.details);
// Add a log for the newly mapped ID 4 (ex-ID 3)
console.log("allTourPackages[3].details (Tour 4 details, from 14-nights):", allTourPackages[3]?.details);
// --- End allTourPackages verification ---


const uiStrings = {
    backToTours: { eng: '← Back to Tours', ara: '→ العودة إلى الجولات' },
    itineraryTitle: { eng: 'Full Itinerary', ara: 'خط سير الرحلة الكامل' },
    bookButton: { eng: 'Book This Tour', ara: 'احجز هذه الجولة' },
    tourNotFound: { eng: 'Tour not found', ara: 'لم يتم العثور على الجولة' },
    reviews: { eng: 'Reviews', ara: 'التقييمات' },
    chooseOption: { eng: 'Choose your package option:', ara: 'اختر خيار باقتك:' }
};


const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // --- Inside TourDetail component, on each render ---
    console.log("\n--- TourDetail.js: Render Cycle Started ---");
    console.log("  URL Param ID:", id);

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage === 'eng' || savedLanguage === 'ara' || savedLanguage === 'geo') {
            return savedLanguage;
        }
        return 'ara';
    });

    // State to hold the price of the currently selected star option
    const [selectedStarOptionPrice, setSelectedStarOptionPrice] = useState(null);

    const languageOptions = [
        { value: 'eng', label: 'ENG' },
        { value: 'ara', label: 'العربية' }
    ];

    const tourPackage = allTourPackages.find(p => p.id === parseInt(id));

    console.log("  Parsed ID for lookup:", parseInt(id));
    console.log("  Found tourPackage:", tourPackage);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage === 'eng' || savedLanguage === 'ara' || savedLanguage === 'geo') {
            setCurrentLanguage(savedLanguage);
        } else if (!savedLanguage || (savedLanguage !== 'eng' && savedLanguage !== 'ara' && savedLanguage !== 'geo')) {
            setCurrentLanguage('ara');
            localStorage.setItem('selectedLanguage','ara');
        }

        // Initialize selectedStarOptionPrice with the 4-star option if priceOptions exist
        if (tourPackage && tourPackage.priceOptions && tourPackage.priceOptions.length > 0) {
            setSelectedStarOptionPrice(tourPackage.priceOptions[0].price); // Default to first (4-star) option
        } else {
            setSelectedStarOptionPrice(null); // Clear if no options
        }
    }, [tourPackage, id]); // Depend on tourPackage and ID to re-initialize when tour changes


    const handleLanguageChange = (language) => {
        setCurrentLanguage(language);
        localStorage.setItem('selectedLanguage', language);
    };

    if (!tourPackage) {
        console.error("  Tour not found for ID:", id);
        return (
            <div className="tour-detail-body">
                <div className="tour-not-found">
                    <h2>{uiStrings.tourNotFound[currentLanguage]}</h2>
                    <button className="return" onClick={() => navigate('/tours')}>
                        {/* Navigates to /tours */}
                        {uiStrings.backToTours[currentLanguage]}
                    </button>
                </div>
            </div>
        );
    }

    console.log("  Bypassed Tour Not Found check.");
    console.log("  tourPackage.details (before language selection):", tourPackage.details);
    console.log("  currentLanguage (used for indexing):", currentLanguage);

    const tourContent = tourPackage.details[currentLanguage];

    console.log("  tourContent (after assignment):", tourContent);

    // Determine the current price to display. All tours now have priceOptions.
    let currentDisplayPrice = tourPackage.priceOptions[0].price; // Default to 4-star price from options

    if (selectedStarOptionPrice) { // If a specific star option is selected
        const selectedOption = tourPackage.priceOptions.find(opt => opt.price === selectedStarOptionPrice);
        if (selectedOption) {
            currentDisplayPrice = selectedOption.price;
        }
    }


    const handleBook = () => {
        navigate(`/tours/${id}/booking?price=${encodeURIComponent(currentDisplayPrice)}`); // Use encodeURIComponent for price
    };

    const languageClass = `lang-${currentLanguage}`;

    return (
        <div className={`tour-detail-body ${languageClass}`}>
            <div className="tour-detail-container">

                <div className="tour-detail-header">
                    <button className="return" onClick={() => navigate('/tours')}>
                        {/* Navigates to /tours */}
                        {uiStrings.backToTours[currentLanguage]}
                    </button>

                    <div className="language-selector-container">
                        <select
                            value={currentLanguage}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="language-dropdown"
                        >
                            {languageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="tour-detail-card">
                    <div className="tour-detail-image">
                        <img src={tourPackage.image} alt={tourContent.title} />
                    </div>

                    <div className="tour-detail-content">
                        <h1 className="tour-detail-title">{tourContent.title}</h1>
                        <div className="tour-detail-rating">
                            <span className="rating-score">{tourPackage.rating} ⭐</span>
                            <span className="rating-reviews">({tourPackage.reviews} {uiStrings.reviews[currentLanguage]})</span>

                            {/* All tours now have priceOptions, so this conditional is simpler */}
                            <div className="price-options-selector">
                                <p>{uiStrings.chooseOption[currentLanguage]}</p>
                                {tourPackage.priceOptions.map((option, index) => (
                                    <div key={index} className="price-option-radio">
                                        <input
                                            type="radio"
                                            id={`star-option-${option.stars}-${tourPackage.id}`} // Unique ID for radio button
                                            name={`starOption-${tourPackage.id}`} // Unique name for radio button group
                                            value={option.price}
                                            checked={selectedStarOptionPrice === option.price}
                                            onChange={(e) => setSelectedStarOptionPrice(e.target.value)}
                                        />
                                        <label htmlFor={`star-option-${option.stars}-${tourPackage.id}`}>
                                            {option.label} ({option.price})
                                        </label>
                                    </div>
                                ))}
                                <span className="tour-detail-price tour-detail-selected-price">
                                    Current Price: {currentDisplayPrice}
                                </span>
                            </div>
                        </div> {/* Close tour-detail-rating div */}

                        <button className="tour-book-btn" onClick={handleBook}>
                            {uiStrings.bookButton[currentLanguage]} - {currentDisplayPrice}
                        </button>
                    </div>

                    <div className="itinerary-section">
                        <h2 className="itinerary-title">{uiStrings.itineraryTitle[currentLanguage]}</h2>
                        {tourContent.itinerary.map((dayItem, index) => (
                            <div className="itinerary-day" key={index}>
                                <h3>{dayItem.day}</h3>
                                <p>{dayItem.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="tour-extras-container">
                        <div className="inclusions-exclusions-grid">
                            {tourContent.inclusions && (
                                <div className="info-section inclusions">
                                    <h3>{tourContent.inclusions.title}</h3>
                                    <ul>
                                        {tourContent.inclusions.items.map((item, index) => (<li key={index}>{item}</li>))}
                                    </ul>
                                </div>
                            )}
                            {tourContent.exclusions && (
                                <div className="info-section exclusions">
                                    <h3>{tourContent.exclusions.title}</h3>
                                    <ul>
                                        {tourContent.exclusions.items.map((item, index) => (<li key={index}>{item}</li>))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {tourContent.optionalActivities && (
                            <div className="info-section optional-activities">
                                <h3>{tourContent.optionalActivities.title}</h3>
                                <ul>
                                    {tourContent.optionalActivities.items.map((item, index) => (<li key={index}>{item}</li>))}
                                </ul>
                            </div>
                        )}
                        {tourContent.farewell && (<p className="farewell-message">{tourContent.farewell}</p>)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TourDetail;