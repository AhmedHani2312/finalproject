import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'; // Import the CSS file for styling

function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Page</h2>
      <p>This is a placeholder for the contact page content.</p>
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

export default Contact;
