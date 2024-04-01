import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy';
import Signup from './Signup';
import Personalityform from './Personalityform';
import FeaturesForm from './FeaturesForm';
import CountryChoice from './CountryChoice';
import Rating from './Rating';
import Recommendation from './Recommendation';
import UsabilitySurveyForm from './UsabilitySurveyForm';
import Contact from './Contact';


import './App.css';

function Explore() {
  return (
    <div>
      <h2>Explore Page</h2>
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

// function Contact() {
//   return (
//     <div>
//       <h2>Contact Page</h2>
//       <Link to="/" className="back-to-home-btn">Back to Home</Link>
//     </div>
//   );
// }

function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const handleShowVideo = () => setShowVideo(!showVideo); // Toggle video display

  return (
    <div className="App">
      <div className="navigation-bar">
        <div className="logo-container">
            <img src="/images/logo.jpg" alt="App Logo" className="logo" />
        </div>
        <div className="navigation-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
      </div>
      {!showVideo ? (
        <>
          <Carousel className="carousel" interval={null} pause='hover'>
            <Carousel.Item>
              <img className="d-block w-100" src="/images/formphoto.jpg" alt="First slide"/>
              <Carousel.Caption className="caption caption-one">
                <h3>Your Future Starts Here</h3>
                <p>Dive into your Future with our University Recommendations...</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="/images/homepage.jpg" alt="Second slide"/>
              <Carousel.Caption className="caption caption-two">
                <h3>Discover Endless Possibilities With Us!</h3>
                <p>Find Universities that align with your Passion.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="/images/students2.jpg" alt="Third slide"/>
              <Carousel.Caption className="caption caption-three">
                <h3>Connect With Your Dream University</h3>
                <p>Start your Journey towards Academic Excellence Today.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className="buttons-container">
            <Link to="/signup" className="custom-get-started-btn">Get Started <span className="arrow-icon"></span></Link>
            <button className="custom-see-video-btn" onClick={handleShowVideo}>Play Short Video <img src="/images/play_icon2.png" alt="Play icon"/></button>
          </div>
        </>
      ) : (
        <div className="video-container">
  <ReactPlayer 
    url="/images/Vedio edited.mp4" 
    playing={true} 
    controls={true} 
    width="100vw" 
    height="100vh" 
    loop={true} // Add this line to enable looping
  />
  <button className="back-btn" onClick={handleShowVideo}>Close Video</button>
</div>

      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <div className="navigation-bar">
        <div className="logo-container">
          <img src="/images/logo.jpg" alt="App Logo" className="logo" />
        </div>
        <div className="navigation-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personality-form" element={<Personalityform />} />
        <Route path="/features-form" element={<FeaturesForm />} />
        <Route path="/country-choice" element={<CountryChoice />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/usability-survey-form" element={<UsabilitySurveyForm />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
