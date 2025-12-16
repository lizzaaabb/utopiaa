// src/PrivacyPolicy.js
import React, { useEffect } from 'react';
import './Styles/PrivacyPolicy.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Utopia VIP Tourism & Real Estate";
    window.scrollTo(0, 0);
  }, []);

  return (
    // NEW: This wrapper div will have the black background
    <div className="privacy-policy-page-wrapper">
      {/* Existing: This container holds the light-colored policy content */}
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>

        <p>
          <strong>Last updated: December 14, 2023</strong>
        </p>

        <p>
          Utopia VIP Tourism & Real Estate ("us", "we", or "our") operates
          the https://www.utopiaviptravel.com website (the "Service").
        </p>
        <p>
          This page informs you of our policies regarding the collection,
          use, and disclosure of personal data when you use our Service and
          the choices you have associated with that data.
        </p>
        <p>
          We use your data to provide and improve the Service. By using the
          Service, you agree to the collection and use of information in
          accordance with this policy. Unless otherwise defined in this
          Privacy Policy, terms used in this Privacy Policy have the same
          meanings as in our Terms and Conditions.
        </p>

        <h2>Information Collection And Use</h2>
        <p>
          We collect several different types of information for various
          purposes to provide and improve our Service to you.
        </p>

        <h3>Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you ("Personal Data"). Personally identifiable information
          may include, but is not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h4>Usage Data</h4>
        <p>
          We may also collect information how the Service is accessed and
          used ("Usage Data"). This Usage Data may include information such
          as your computer's Internet Protocol address (e.g. IP address),
          browser type, browser version, the pages of our Service that you
          visit, the time and date of your visit, the time spent on those
          pages, unique device identifiers and other diagnostic data.
        </p>

        <h2>Use of Data</h2>
        <p>Utopia VIP Tourism & Real Estate uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain the Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer care and support</li>
          <li>To provide analysis or valuable information so that we can improve the Service</li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2>Security Of Data</h2>
        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet, or method of electronic
          storage is 100% secure. While we strive to use commercially
          acceptable means to protect your Personal Data, we cannot guarantee
          its absolute security.
        </p>

        <h2>Links To Other Sites</h2>
        <p>
          Our Service may contain links to other sites that are not operated
          by us. If you click on a third party link, you will be directed to
          that third party's site. We strongly advise you to review the
          Privacy Policy of every site you visit.
        </p>
        <p>
          We have no control over and assume no responsibility for the
          content, privacy policies or practices of any third party sites or services.
        </p>

        <h2>Changes To This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          We will let you know via email and/or a prominent notice on our
          Service, prior to the change becoming effective and update the
          "last updated" date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul>
          <li>By email: utopiaviptravel@gmail.com</li>
        </ul>

        {/* Optional: A back to home link */}
        <div className="back-to-home">
          <Link to="/" className="home-link">← Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;