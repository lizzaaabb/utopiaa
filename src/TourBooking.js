// src/TourBooking.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Footer from './Footer.js';
import './Styles/TourBooking.css';

// --- IMPORTANT & REQUIRED: Imports for allTourPackages, since it's declared locally ---
// Import individual tour detail objects from Array.js
import {
    sevenNightsEightDays,
    nineNightsTenDays,
    fourteenNightsFifteenDays,
    twelveNightsThirteenDays
} from './Array.js'; // <- Ensure this path is correct if Array.js is not in same directory

// Import pictures for allTourPackages
import pic1 from './Pictures/tour1.jpg'; // Ensure these paths are correct
import pic2 from './Pictures/tour2.jpg'; // Corrected to be consistent with others
import pic3 from './Pictures/tour3.jpg';
import pic4 from './Pictures/tour4.jpg';


// --- allTourPackages DEFINED DIRECTLY HERE ---
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


// UI Strings for TourBooking.js. Ensure these keys match your global language state (eng/ara).
const uiStringsBooking = {
  tourNotFound: { eng: 'Tour not found', ara: 'لم يتم العثور على الجولة' },
  backToTours: { eng: 'Back to Tours', ara: 'العودة إلى الجولات' }
};


const TourBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // State to hold form input values
    const [bookingData, setBookingData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        participants: 1, // Default to 1 participant
        specialRequests: ''
    });

    // State to manage the form submission status (e.g., to disable button)
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State to store and display feedback messages to the user (for errors, not success anymore)
    const [submitMessage, setSubmitMessage] = useState('');

    // NEW STATE: Store the booking details that were just successfully submitted
    const [lastSubmittedBookingDetails, setLastSubmittedBookingDetails] = useState(null);
    // NEW STATE: Control visibility of the success modal
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // --- YOUR FORMSPREE ENDPOINT ---
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzgvazz';


    // 1. Find the tour package by ID from our `allTourPackages` array
    const tourPackage = allTourPackages.find(p => p.id === parseInt(id));

    // 2. Get the `price` query parameter from the URL (sent by TourDetail)
    const urlPriceParam = searchParams.get('price');

    // 3. Determine the final price string to use for this specific booking
    let actualPriceString = tourPackage?.priceOptions?.[0]?.price; // Default to 4-star option if available

    // If a price was passed in the URL (it always should be from TourDetail), use the URL parameter
    if (urlPriceParam) {
        actualPriceString = urlPriceParam;
    }


    // Function to safely convert a price string (e.g., "$3600") to a numeric value (e.g., 3600)
    const parsePriceToNumber = (priceStr) => {
        if (!priceStr) return 0;
        return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    };
    // Convert the determined price string into a number for calculations
    const actualPriceNumeric = parsePriceToNumber(actualPriceString);


    // 4. Construct the `tour` object, which will be used for display within this component
    // --- IMPORTANT: Changed .en to .eng throughout to match Array.js ---
    const tour = tourPackage ? {
        id: tourPackage.id,
        title: tourPackage.details.eng.title,             // <--- FIX: Changed .en.title to .eng.title
        priceString: actualPriceString,
        priceNumeric: actualPriceNumeric,
        image: tourPackage.image,
        // Access duration and groupSize from the details.eng object.
        // Use "N/A" as a fallback if these properties are missing in Array.js
        duration: tourPackage.details.eng.duration || "N/A", // <--- FIX: Changed .en.duration to .eng.duration
        groupSize: tourPackage.details.eng.groupSize || "N/A", // <--- FIX: Changed .en.groupSize to .eng.groupSize
        rating: tourPackage.rating,
        reviews: tourPackage.reviews
    } : null;

    // useEffect hook to log warnings if `duration` or `groupSize` are missing for a tour.
    // This helps in debugging if 'N/A' appears on the page unexpectedly.
    useEffect(() => {
        if (tourPackage) {
            // --- IMPORTANT: Changed .en to .eng in console.warn checks ---
            if (!tourPackage.details?.eng?.duration) {
                console.warn(`Tour ID ${tourPackage.id} ('${tourPackage.details?.eng?.title || "Unknown"}') is missing 'duration' in details.eng from Array.js. Displaying as N/A.`);
            }
            if (!tourPackage.details?.eng?.groupSize) {
                console.warn(`Tour ID ${tourPackage.id} ('${tourPackage.details?.eng?.title || "Unknown"}') is missing 'groupSize' in details.eng from Array.js. Displaying as N/A.`);
            }
        }
    }, [tourPackage]);


    // If no tour is found with the given ID, display a "not found" message
    if (!tour) {
        return (
            <div className="booking-body">
                <div className="tour-not-found">
                    <h2>{uiStringsBooking.tourNotFound.eng}</h2>
                    <button className="return-btn" onClick={() => navigate('/tours')}>
                        {uiStringsBooking.backToTours.eng}
                    </button>
                </div>
            </div>
        );
    }

    // Calculate the total price based on participants
    const totalPrice = tour.priceNumeric * bookingData.participants;

    // Handles changes in form input fields and updates `bookingData` state
    const handleBookingInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));
    };

    // Validates the form data before submission
    const validateBookingForm = () => {
        const { firstName, lastName, email, phone, date, participants } = bookingData;
        return firstName && lastName && email && phone && date && participants > 0;
    };

    // Handles the form submission (sends data to Formspree)
    const handleConfirmBooking = async (e) => {
        e.preventDefault();

        if (!validateBookingForm()) {
            setSubmitMessage('Please fill in all *required* fields correctly and ensure participants > 0.');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const formData = {
                "Tour ID": tour.id,
                "Tour Name": tour.title,
                "Selected Package Price": tour.priceString,
                "Number of Participants": bookingData.participants,
                "Total Price": `$${totalPrice}`,
                "Booking Date": bookingData.date,
                "First Name": bookingData.firstName,
                "Last Name": bookingData.lastName,
                "Email": bookingData.email,
                "Phone": bookingData.phone,
                "Special Requests": bookingData.specialRequests || "None specified",
                "_replyto": bookingData.email,
            };

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setLastSubmittedBookingDetails(bookingData);
                setShowSuccessModal(true);
                setBookingData({
                    firstName: '', lastName: '', email: '', phone: '', date: '', participants: 1, specialRequests: ''
                });
            } else {
                const data = await response.json();
                const errorDetail = data.errors ? data.errors.map(err => err.message).join(', ') : 'Unknown error.';
                setSubmitMessage(`Failed to submit booking. Please try again. Error: ${errorDetail}`);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            setSubmitMessage('An unexpected error occurred during submission. Please check your network and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="booking-body">
            <div className="booking-container">
                <div className="booking-header">
                    <button className="return-btn" onClick={showSuccessModal ? () => setShowSuccessModal(false) : () => navigate(-1)}>
                        {showSuccessModal ? 'Close' : '← Back to Tour'}
                    </button>
                    <div className="booking-steps">
                        <span className="step active">1. Booking Details</span>
                        <span className="step">2. Confirmation</span>
                    </div>
                </div>

                <div className="booking-content">
                    {tour ? (
                      <div className="tour-summary">
                          <img src={tour.image} alt={tour.title} className="tour-summary-image" />
                          <div className="tour-summary-details">
                              <h3>{tour.title}</h3>
                              <div className="tour-summary-info">
                                  <span>⏱️ {tour.duration}</span>
                                  <span>👥 {tour.groupSize}</span>
                                  <span>⭐ {tour.rating} ({tour.reviews} reviews)</span>
                              </div>
                              <div className="price-summary">
                                  <div className="price-breakdown">
                                      <span>{tour.priceString} × {bookingData.participants} participant{bookingData.participants > 1 ? 's' : ''}</span>
                                      <span className="total-price">${totalPrice}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    ) : (
                       null
                    )}

                    <div className="booking-form">
                        <h2>Booking Details</h2>
                        <form onSubmit={handleConfirmBooking}>
                            <div className="form-row">
                                <div className="form-group"><label>First Name *</label><input type="text" name="firstName" value={bookingData.firstName} onChange={handleBookingInputChange} required /></div>
                                <div className="form-group"><label>Last Name *</label><input type="text" name="lastName" value={bookingData.lastName} onChange={handleBookingInputChange} required /></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label>Email *</label><input type="email" name="email" value={bookingData.email} onChange={handleBookingInputChange} required /></div>
                                <div className="form-group"><label>Phone *</label><input type="tel" name="phone" value={bookingData.phone} onChange={handleBookingInputChange} required /></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label>Tour Date *</label><input type="date" name="date" value={bookingData.date} onChange={handleBookingInputChange} min={new Date().toISOString().split('T')[0]} required /></div>
                                <div className="form-group">
                                    <label>Number of Participants</label>
                                    <select name="participants" value={bookingData.participants} onChange={handleBookingInputChange}>
                                        { [1,2,3,4,5,6,7,8].map(num => (<option key={num} value={num}>{num}</option>)) }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group"><label>Special Requests (Optional)</label><textarea name="specialRequests" value={bookingData.specialRequests} onChange={handleBookingInputChange} rows="3" placeholder="Any dietary restrictions, accessibility needs, or special requests..." /></div>

                            {submitMessage && (
                                <p className={'submit-error-message'}>
                                    {submitMessage}
                                </p>
                            )}

                            <button className="proceed-btn" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : `Confirm Booking - $${totalPrice}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />

            {showSuccessModal && lastSubmittedBookingDetails && tour && (
                <div className="success-modal-overlay">
                    <div className="success-modal-content">
                        <h2>🎉 Booking Confirmed! 🎉</h2>
                        <p>Thank you for your booking with Utopia Tours!</p>
                        <p>Your request for the **{tour.title}** tour, starting on **{lastSubmittedBookingDetails.date}** with **{lastSubmittedBookingDetails.participants} participant{lastSubmittedBookingDetails.participants > 1 ? 's' : ''}**, has been successfully submitted.</p>
                        <p>We've sent a confirmation email (simulated) and will contact you directly at **{lastSubmittedBookingDetails.email}** to finalize the details and your journey with us.</p>
                        <button className="modal-return-home-btn" onClick={() => {
    // 1. First, explicitly close the modal by setting its state to false
    // This is good practice to ensure the modal's internal state is clean.
    setShowSuccessModal(false);

    // 2. Then, use React Router's navigate function to go to the home route ('/')
    // This performs a client-side navigation without a full page reload.
    navigate('/');
}}>
    Return Home
</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TourBooking;