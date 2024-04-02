


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Rating.css';

// const Rating = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const [universities, setUniversities] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const { country, userId, userEmail } = state; // Assuming userEmail is also part of the passed state

//   const fetchUniversities = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/university/randomUniversities?country=${country}`);
//       setUniversities(response.data.map((uni, index) => ({
//         ...uni,
//         ratingKey: `uni${index + 1}`
//       })));
//     } catch (error) {
//       console.error('Error fetching universities:', error);
//     }
//   }, [country]);

//   useEffect(() => {
//     fetchUniversities();
//   }, [fetchUniversities]);

//   const handleRatingChange = (event, ratingKey) => {
//     setRatings({ ...ratings, [ratingKey]: Number(event.target.value) });
//   };

//   const handleSubmit = async () => {
//     try {
//       const ratingsToSubmit = universities.map(uni => ({
//           universityId: uni.id,
//           ratingValue: ratings[uni.ratingKey] ?? 0
//       }));

//       await axios.post('http://localhost:3000/university/submitRatings', {
//           userId,
//           ratings: ratingsToSubmit
//       });

//       // Now including userEmail in the navigation state along with userId and selectedFeatures
//       navigate('/recommendation', { state: { userId, userEmail, selectedFeatures: state.selectedFeatures } });
//     } catch (error) {
//       console.error('Error submitting ratings:', error);
//     }
//   };

//   const refreshPage = () => {
//     window.location.reload(false);
//   };

//   return (
//     <div className="rating-container">
//       <div className="rating-content-wrapper">
//         <h2>Rate the Universities</h2>
//         <div className="universities-container">
//           {universities.map((uni) => (
//             <div key={uni.ratingKey} className="university-box">
//               <span>{uni.name}</span>
//               <input
//                 type="range"
//                 name={uni.ratingKey}
//                 min="0"
//                 max="100"
//                 value={ratings[uni.ratingKey] || 0}
//                 onChange={(event) => handleRatingChange(event, uni.ratingKey)}
//                 className="rating-range"
//               />
//               <div>{ratings[uni.ratingKey] || 0}%</div>
//             </div>
//           ))}
//         </div>
//         <button onClick={refreshPage} className="btn btn-secondary mt-3">Generate other Universities</button>
//         <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Ratings</button>
//       </div>
//     </div>
//   );
// };

// export default Rating;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Rating.css'; // Make sure this is the correct path to your CSS file

const Rating = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [universities, setUniversities] = useState([]);
  const [ratings, setRatings] = useState({});
  const { country, userId, userEmail } = state;

  const fetchUniversities = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/university/randomUniversities?country=${country}`);
      setUniversities(response.data.map((uni, index) => ({
        ...uni,
        ratingKey: `uni${index + 1}`
      })));
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  }, [country]);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  const handleRatingChange = (ratingKey, newRating) => {
    setRatings({ ...ratings, [ratingKey]: newRating * 20 });
  };

  const starClass = (index, ratingValue) => {
    const classNames = ['star1', 'star2', 'star3', 'star4', 'star5'];
    return index < ratingValue ? classNames[ratingValue - 1] : '';
  };

  const renderStars = (ratingKey) => {
    const ratingValue = ratings[ratingKey] ? ratings[ratingKey] / 20 : 0;
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={starClass(i, ratingValue)}
        onClick={() => handleRatingChange(ratingKey, i + 1)}
      >★</span>
    ));
  };

  const handleSubmit = async () => {
    try {
      const ratingsToSubmit = universities.map(uni => ({
        universityId: uni.id,
        ratingValue: ratings[uni.ratingKey] ?? 0
      }));

      await axios.post('http://localhost:3000/university/submitRatings', {
        userId,
        ratings: ratingsToSubmit
      });

      navigate('/recommendation', { state: { userId, userEmail, selectedFeatures: state.selectedFeatures } });
    } catch (error) {
      console.error('Error submitting ratings:', error);
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

   return (
    <div className="rating-container">
      <div className="rating-content-wrapper">
      <h2 className="rating-heading">Rate the Universities</h2>

        <div className="universities-container">
          {universities.map((uni) => (
            <div key={uni.ratingKey} className="university-box">
              <span className="university-name">{uni.name}</span>
              <div className="star-rating">
                {renderStars(uni.ratingKey)}
              </div>
              
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={refreshPage} className="btn btn-refresh">Generate Other Universities</button>
          <button onClick={handleSubmit} className="btn btn-submit">Submit Ratings</button>
        </div>
      </div>
    </div>
  );
};

export default Rating;