import React from 'react';

// Import all the components that make up your homepage
import Heading from './Heading';
import About2 from './About2';
import Georgia from './Georgia';
import GeorgiaHeader from './GeorgiaHeader';
import AboutGeorgia from './AboutGeorgia';
import Georgia2 from './Georgia2';
import TourismHeader from './TourismHeader';
import TourismGeorgia from './TourismGeorgia';
import ReGeorgia from './ReGeorgia';
import Opportunity from './Opportunity';
import Footer from './Footer'; // The Footer is part of the homepage layout

const Home = () => {
  return (
    // A React Fragment (<>) lets us group multiple components together
    <>
      <Heading />
      <About2 />
      <Georgia />
      <GeorgiaHeader />
      <AboutGeorgia />
      <Georgia2 />
      <TourismHeader />
      <TourismGeorgia />
      <ReGeorgia />
      <Opportunity />
      <Footer />
    </>
  );
};

export default Home;