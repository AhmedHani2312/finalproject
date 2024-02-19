//rating page
import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Rating.css';

const Rating = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Fetch the random university names when the component mounts
    axios.get('http://localhost:3000/university/randomUniversities')
      .then(response => {
        const uniNames = response.data; // Assuming this is an array of university names
        setUniversities(uniNames);

        // Initialize ratings for each university
        const initialRatings = uniNames.reduce((acc, name, index) => {
          acc[`uni${index + 1}`] = 1; // Start ratings at 1
          return acc;
        }, {});

        setRatings(initialRatings);
      })
      .catch(error => {
        console.error('Error fetching universities:', error);
      });
  }, []);

  const handleStarClick = (nextValue, name) => {
    setRatings({ ...ratings, [name]: nextValue });
  };

  const handleSubmit = () => {
    console.log('Ratings:', ratings);
    navigate('/recommendation');
  };

  return (
    <div className="rating-container">
      <h1>Rate the Universities</h1>
      <h4>(Refresh for another List of Universites)</h4>
      <div className="universities-container">
        {universities.map((name, index) => {
          const uniKey = `uni${index + 1}`;
          return (
            <div key={uniKey} className="university-box">
              <span>{name}</span>
              <StarRatingComponent
                name={uniKey}
                starCount={5}
                value={ratings[uniKey]}
                onStarClick={(nextValue) => handleStarClick(nextValue, uniKey)}
              />
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit Ratings</button>
    </div>
  );
};

export default Rating;
