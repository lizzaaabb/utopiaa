import React from 'react'
import './Styles/ToursApp.css'
import Footer from './Footer'
import { useNavigate, Link } from 'react-router-dom'
import {
    sevenNightsEightDays,
    nineNightsTenDays,
    fourteenNightsFifteenDays, // Now associated with ID 4
    twelveNightsThirteenDays   // Now associated with ID 3
} from './Array'
import pic1 from './Pictures/tour1.jpg'
import pic2 from './Pictures/tour2.jpg'
import pic3 from './Pictures/tour3.jpg'
import pic4 from './Pictures/tour4.jpg'


function ToursApp() {
    const navigate = useNavigate();

    const handleBookNow = (tourId) => {
        navigate(`/tours/${tourId}`)
    }

    const toursData = [
        // Tour ID 1: 7 Nights / 8 Days (first in order)
        {
            id: 1,
            category: "INDIVIDUAL",
            title: sevenNightsEightDays.eng.title,
            rating: 4.8,
            price: "$1111", // New 4-star price
            image: pic1
        },
        // Tour ID 2: 9 Nights / 10 Days (second in order)
        {
            id: 2,
            category: "INDIVIDUAL",
            title: nineNightsTenDays.eng.title,
            rating: 4.9,
            price: "$1500", // New 4-star price
            image: pic2
        },
        // Tour ID 3: 12 Nights / 13 Days (third in order)
        {
            id: 3,
            category: "INDIVIDUAL",
            title: twelveNightsThirteenDays.eng.title, // Maps to 12 nights data
            rating: 4.9,
            price: "$3600", // New 4-star price
            image: pic3
        },
        // Tour ID 4: 14 Nights / 15 Days (fourth in order)
        {
            id: 4,
            category: "INDIVIDUAL",
            title: fourteenNightsFifteenDays.eng.title, // Maps to 14 nights data
            rating: 4.8,
            price: "$4000", // New 4-star price
            image: pic4
        }
    ];

    return (
        <div className='tours-app-body'>
            <div className="tours-app-container">
                <div className="tours-app-heading">
                    <div className="home-button">
                        <Link
                            to="/"
                            className="return"
                        >
                            Return Home
                        </Link>
                    </div>
                    <div className="tours-heading-title">
                        <h2>Discover Tours</h2>
                        <p>Your journey to Georgia's beauty starts here.</p>
                    </div>
                </div>

                <div className="tours-card-container">
                    {toursData.map(tour => (
                        <div key={tour.id} className="tours-card">
                            <div className="tours-card-image">
                                <img src={tour.image} alt={tour.title} />
                            </div>
                            <div className="tours-card-content">
                                <span className="tours-category">{tour.category}</span>
                                <h3>{tour.title}</h3>
                                <div className="tours-rating">
                                    <span className="tours-score">{tour.rating} ⭐</span>

                                </div>
                                <div className="tours-price">
                                    <span className="tours-amount">{tour.price}</span>
                                </div>
                                <button
                                    className="tours-purchase"
                                    onClick={() => handleBookNow(tour.id)}
                                >
                                    Learn More
                                </button>
                            </div>
                            <button className="tours-favorite">♡</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ToursApp;