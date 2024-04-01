// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Rating.css';

// const Rating = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const [universities, setUniversities] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const { country, userId } = state;

//   // Here's the useCallback hook to memoize fetchUniversities function
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
//   }, [country]);  // Dependency array includes `country` because the fetching logic depends on it

//   // useEffect uses the memoized function and updates when `fetchUniversities` changes
//   useEffect(() => {
//     fetchUniversities();
//   }, [fetchUniversities]);

//   const handleRatingChange = (event, ratingKey) => {
//     setRatings({ ...ratings, [ratingKey]: Number(event.target.value) });
//   };

//   const handleSubmit = async () => {
//     try {
//         // Ensure each university has a rating, defaulting to 0 if not set
//         const ratingsToSubmit = universities.map(uni => {
//             return {
//                 universityId: uni.id,
//                 ratingValue: ratings[uni.ratingKey] ?? 0  // Use nullish coalescing operator to default to 0
//             };
//         });

//         await axios.post('http://localhost:3000/university/submitRatings', {
//             userId,
//             ratings: ratingsToSubmit
//         });

//         navigate('/recommendation', { state: { userId, selectedFeatures: state.selectedFeatures } }); // Make sure to pass the correct state you need
//     } catch (error) {
//         console.error('Error submitting ratings:', error);
//     }
// };

//   // Function to refresh page for generating new universities
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
import './Rating.css';

const Rating = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [universities, setUniversities] = useState([]);
  const [ratings, setRatings] = useState({});
  const { country, userId, userEmail } = state; // Assuming userEmail is also part of the passed state

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

  const handleRatingChange = (event, ratingKey) => {
    setRatings({ ...ratings, [ratingKey]: Number(event.target.value) });
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

      // Now including userEmail in the navigation state along with userId and selectedFeatures
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
        <h2>Rate the Universities</h2>
        <div className="universities-container">
          {universities.map((uni) => (
            <div key={uni.ratingKey} className="university-box">
              <span>{uni.name}</span>
              <input
                type="range"
                name={uni.ratingKey}
                min="0"
                max="100"
                value={ratings[uni.ratingKey] || 0}
                onChange={(event) => handleRatingChange(event, uni.ratingKey)}
                className="rating-range"
              />
              <div>{ratings[uni.ratingKey] || 0}%</div>
            </div>
          ))}
        </div>
        <button onClick={refreshPage} className="btn btn-secondary mt-3">Generate other Universities</button>
        <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Ratings</button>
      </div>
    </div>
  );
};

export default Rating;
