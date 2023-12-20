// Recommendation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Recommendation = () => {
  return (
    <div>
      <h2>Recommendation</h2>
      {/* Add additional content or components for the Recommendation here */}
      <Link to="/usability-survey-form">
        <button>Next Page</button>
      </Link>
    </div>
  );
};

export default Recommendation;
