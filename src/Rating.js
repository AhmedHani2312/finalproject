// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Rating.css';

// const Rating = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [universities, setUniversities] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const { country } = location.state;

//   useEffect(() => {
//     axios.get(`http://localhost:3000/university/randomUniversities?country=${country}`)
//       .then(response => {
//         const uniNames = response.data;
//         setUniversities(uniNames);
//         const initialRatings = uniNames.reduce((acc, name, index) => {
//           acc[`uni${index + 1}`] = 0; // Initialize ratings at 0 for progress bar
//           return acc;
//         }, {});
//         setRatings(initialRatings);
//       })
//       .catch(error => console.error('Error fetching universities:', error));
//   }, [country]);

//   const handleRatingChange = (event, name) => {
//     const { value } = event.target;
//     setRatings({ ...ratings, [name]: Number(value) });
//   };

//   const handleSubmit = () => {
//     console.log('Ratings:', ratings);
//     navigate('/recommendation');
//   };
 

  
//   return (
//     <div className="rating-container">
//       <h2>Rate the Universities</h2>
//       <div className="universities-container">
//         {universities.map((name, index) => {
//           const uniKey = `uni${index + 1}`;
//           return (
//             <div key={uniKey} className="university-box">
//               <span>{name}</span>
//               <input
//                 type="range"
//                 name={uniKey}
//                 min="0"
//                 max="100"
//                 value={ratings[uniKey]}
//                 onChange={(event) => handleRatingChange(event, uniKey)}
//                 className="rating-range"
//               />
//               <div>{ratings[uniKey]}%</div>
//             </div>
//           );
//         })}
//       </div>
//       <button onClick={handleSubmit}>Submit Ratings</button>
//     </div>
//   );
// };

// export default Rating;
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Rating.css';

const Rating = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [universities, setUniversities] = useState([]);
  const [ratings, setRatings] = useState({});
  const { country, userId } = location.state;

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/university/randomUniversities?country=${country}`);
        console.log("Fetched universities:", response.data);
        const transformedUniversities = response.data.map((uni, index) => ({
          ...uni,
          ratingKey: `uni${index + 1}` // Ensure unique key for each uni based on index
        }));
        setUniversities(transformedUniversities);
        const initialRatings = transformedUniversities.reduce((acc, curr) => ({
          ...acc,
          [curr.ratingKey]: 0 // Initialize ratings for each university
        }), {});
        setRatings(initialRatings);

      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, [country]);

  const handleRatingChange = (event, ratingKey) => {
    const value = Number(event.target.value);
    setRatings(prevRatings => ({
      ...prevRatings,
      [ratingKey]: value // Update rating for the specific university
    }));
  };

  const handleSubmit = async () => {
    if (!userId || universities.length === 0 || Object.keys(ratings).length !== universities.length) {
      console.error('Cannot submit ratings, missing data');
      return;
    }

    const ratingsToSubmit = universities.map((uni) => {
      return {
        universityId: uni.id, // Ensure proper mapping of university ID
        ratingValue: ratings[uni.ratingKey] // Fetch the corresponding rating value
      };
    });

    console.log("Ratings to submit:", ratingsToSubmit);

    try {
      const response = await axios.post('http://localhost:3000/university/submitRatings', {
        userId,
        ratings: ratingsToSubmit
      });
      console.log("Submission response:", response.data);
      navigate('/recommendation', { state: { userId } }); // Navigate to recommendations page
    } catch (error) {
      console.error('Error submitting ratings:', error);
    }
  };

  return (
    <div className="rating-container">
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
              value={ratings[uni.ratingKey]}
              onChange={(event) => handleRatingChange(event, uni.ratingKey)}
              className="rating-range"
            />
            <div>{ratings[uni.ratingKey]}%</div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Ratings</button>
    </div>
  );
};

export default Rating;

