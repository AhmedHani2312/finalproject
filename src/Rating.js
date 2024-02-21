import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Rating.css';

const Rating = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [universities, setUniversities] = useState([]);
  const [ratings, setRatings] = useState({});
  const { country } = location.state;

  useEffect(() => {
    axios.get(`http://localhost:3000/university/randomUniversities?country=${country}`)
      .then(response => {
        const uniNames = response.data;
        setUniversities(uniNames);
        const initialRatings = uniNames.reduce((acc, name, index) => {
          acc[`uni${index + 1}`] = 1;
          return acc;
        }, {});
        setRatings(initialRatings);
      })
      .catch(error => console.error('Error fetching universities:', error));
  }, [country]);

  const handleStarClick = (nextValue, name) => {
    setRatings({ ...ratings, [name]: nextValue });
  };

  const handleSubmit = () => {
    console.log('Ratings:', ratings);
    navigate('/recommendation');
  };

  return (
    <div className="rating-container">
      <h2>Rate the Universities</h2>
      <div className="universities-container">
        {universities.map((name, index) => (
          <div key={`uni${index + 1}`} className="university-box">
            <span>{name}</span>
            <StarRatingComponent
              name={`uni${index + 1}`}
              starCount={5}
              value={ratings[`uni${index + 1}`]}
              onStarClick={(nextValue) => handleStarClick(nextValue, `uni${index + 1}`)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Ratings</button>
    </div>
  );
};

export default Rating;
