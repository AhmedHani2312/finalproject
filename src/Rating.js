// Rating.js
import React from 'react';
import { Link } from 'react-router-dom';

const Rating = () => {
  return (
    <div>
      <h2>Rating</h2>
      {/* Add additional content or components for the Rating here */}
      <Link to="/recommendation">
        <button>Next Page</button>
      </Link>
    </div>
  );
};

export default Rating;
