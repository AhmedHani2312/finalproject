import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Personalityform from './Personalityform';
import FeaturesForm from './FeaturesForm';
import CountryChoice from './CountryChoice';
import Rating from './Rating';
import Recommendation from './Recommendation';
import UsabilitySurveyForm from './UsabilitySurveyForm';
import './App.css'; // Ensure this points to your updated CSS file

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="welcome-text">Welcome to University Recommender System</h1>
        <p>Discover the perfect university for your future!</p>
        <Link to="/signup" className="get-started-btn">
          Get Started
        </Link>
        
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personality-form" element={<Personalityform />} />
        <Route path="/features-form" element={<FeaturesForm />} />
        <Route path="/country-choice" element={<CountryChoice />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/usability-survey-form" element={<UsabilitySurveyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
