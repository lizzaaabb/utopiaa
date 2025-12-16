import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Import the pages you HAVE created
import Home from './Home';
import ToursApp from './ToursApp';
import PrivacyPolicy from './PrivacyPolicy';
import TourDetail from './TourDetail';
import TourBooking from './TourBooking'; // <--- NEW: Import TourBooking component

// You can uncomment these as you implement them and move them into src/ (or src/pages later)
// import BookingSuccess from './BookingSuccess';
// import BookingFailed from './BookingFailed';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* The homepage route, which will show all your sections */}
        <Route path="/" element={<Home />} />

        {/* Route for displaying all tours */}
        <Route path="/tours" element={<ToursApp />} />

        {/* Route for individual tour details */}
        <Route path="/tours/:id" element={<TourDetail />} />

        {/* --- ADD/UNCOMMENT THE ROUTE FOR TOUR BOOKING --- */}
        {/* This route uses a URL parameter ':id' and queries for 'price' */}
        <Route path="/tours/:id/booking" element={<TourBooking />} /> {/* <--- UNCOMMENTED THIS LINE */}

        {/* --- Temporarily comment out the routes for the missing pages --- */}
        {/* <Route path="/booking-success" element={<BookingSuccess />} /> */}
        {/* <Route path="/booking-failed" element={<BookingFailed />} /> */}

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* A "catch-all" route for pages that don't exist */}
        <Route path="*" element={<div><h1>404 Not Found</h1></div>} />
      </Routes>
    </HashRouter>
  );
};

export default App;