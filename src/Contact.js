import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Contact.css'; // Make sure your CSS file is correctly imported

function Contact() {
  const form = useRef();
  const [name, setName] = React.useState(""); // Controlled input for name

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Handle change event for the name input
  const handleNameChange = (e) => {
    const capitalized = capitalizeFirstLetter(e.target.value);
    setName(capitalized); // Set the name with the first letter capitalized
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_9xodsrj', 'template_nl9gk0a', form.current, 'B6jEnqYYsG-jK8tET')
      .then((result) => {
          console.log(result.text);
          alert("Email successfully sent!"); // Alert success message
      }, (error) => {
          console.error("Failed to send email. Error: ", error.text);
          alert("Failed to send email. Please try again."); // Alert error message
      });
    e.target.reset(); // Reset form fields after submission
  };

  return (
    <div className="contact-page">
      <div className="heading-container">
        <h2>Get In Touch With Us!</h2>
      </div>
      <div className="form-container">
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            value={name}
            onChange={handleNameChange}
          />
          <input type="email" name="from_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your message here..." required />
          <input type="submit" value="Send" />
        </form>
      </div>
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

export default Contact;
