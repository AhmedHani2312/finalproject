import React, { useState, useEffect } from 'react';
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
          acc[`uni${index + 1}`] = 0; // Initialize ratings at 0 for progress bar
          return acc;
        }, {});
        setRatings(initialRatings);
      })
      .catch(error => console.error('Error fetching universities:', error));
  }, [country]);

  const handleRatingChange = (event, name) => {
    const { value } = event.target;
    setRatings({ ...ratings, [name]: Number(value) });
  };

  const handleSubmit = () => {
    console.log('Ratings:', ratings);
    navigate('/recommendation');
  };
 

  
  return (
    <div className="rating-container">
      <h2>Rate the Universities</h2>
      <div className="universities-container">
        {universities.map((name, index) => {
          const uniKey = `uni${index + 1}`;
          return (
            <div key={uniKey} className="university-box">
              <span>{name}</span>
              <input
                type="range"
                name={uniKey}
                min="0"
                max="100"
                value={ratings[uniKey]}
                onChange={(event) => handleRatingChange(event, uniKey)}
                className="rating-range"
              />
              <div>{ratings[uniKey]}%</div>
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit Ratings</button>
    </div>
  );
};

export default Rating;








